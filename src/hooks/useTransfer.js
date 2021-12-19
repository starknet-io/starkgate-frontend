import {useCallback, useEffect, useState} from 'react';
import {constants, stark} from 'starknet';

import {eth_deposit, eth_depositEth, eth_withdraw, starknet_initiateWithdraw} from '../api/bridge';
import {allowance, approve} from '../api/erc20';
import {useSelectedToken, useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {ActionType} from '../enums';
import {useEthereumToken, useStarknetToken} from '../providers/TokensProvider';
import {useStarknetWallet, useWallets} from '../providers/WalletsProvider';
import {hashEquals, isEth, txHash} from '../utils';
import {eth_listenOnce, starknet_waitForTransaction} from '../utils/contract';
import {
  useEthBridgeContract,
  useEthereumTokenBridgeContract,
  useMessagingContract,
  useTokenBridgeContract,
  useTokenContract
} from './useContract';

const PROGRESS = {
  approval: symbol => ({
    type: 'Approval required',
    message: `Requesting permission to access your ${symbol} funds`
  }),
  deposit: (amount, symbol) => ({
    type: 'Deposit in progress',
    message: `Depositing ${amount} ${symbol} to StarkNet`
  }),
  initiateWithdraw: (amount, symbol) => ({
    type: 'Initiate withdrawal',
    message: `Initiating withdrawal of ${amount} ${symbol}`
  }),
  waitForAccept: () => ({
    type: 'Transaction received',
    message: `Waiting for transaction to be accepted on StarkNet`
  }),
  waitForEvent: () => ({
    type: 'Accepted on StarkNet',
    message: 'Waiting for message to be received on Ethereum'
  }),
  withdraw: (amount, symbol, recipient) => ({
    type: 'Withdrawal in progress',
    message: `Withdrawing ${amount} ${symbol} to ${recipient}`
  })
};

export const useTransfer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const {account: ethereumAccount, chainId} = useWallets();
  const {account: starknetAccount} = useStarknetWallet();
  const {action} = useTransferData();
  const selectedToken = useSelectedToken();
  const ethBridgeContract = useEthBridgeContract();
  const messagingContract = useMessagingContract();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const getEthereumToken = useEthereumToken();
  const getStarknetToken = useStarknetToken();
  const getEthereumTokenBridgeContract = useEthereumTokenBridgeContract();

  const resetState = () => {
    setData(null);
    setError(null);
    setProgress(null);
    setIsLoading(false);
  };

  const waitForLogMessageToL2 = () => {
    const {symbol} = selectedToken;
    const snBridgeAddress = getStarknetToken(symbol).bridgeAddress[chainId];
    const ethBridgeAddress = getEthereumToken(symbol).bridgeAddress[chainId];
    return new Promise((resolve, reject) => {
      eth_listenOnce(messagingContract, 'LogMessageToL2', (error, event) => {
        const {
          returnValues: {to_address, from_address, selector, payload}
        } = event;
        if (
          hashEquals(
            [to_address, from_address, selector],
            [snBridgeAddress, ethBridgeAddress, stark.getSelectorFromName('handle_deposit')]
          )
        ) {
          if (error) {
            reject(error);
          }
          resolve(txHash(from_address, to_address, selector, payload, chainId));
        }
      });
    });
  };

  const waitForLogMessageToL1 = () => {
    return new Promise((resolve, reject) => {
      eth_listenOnce(messagingContract, 'LogMessageToL1', (error, event) => {
        if (error) {
          reject(error);
        }
        resolve(event);
      });
    });
  };

  const transferToStarknet = async (amount, depositHandler, bridgeContract, tokenContract) => {
    const {bridgeAddress, symbol, name} = selectedToken;
    resetState();
    try {
      setIsLoading(true);
      if (!isEth(symbol)) {
        setProgress(PROGRESS.approval(symbol));
        const allow = await allowance(ethereumAccount, bridgeAddress[chainId], tokenContract);
        if (allow < amount) {
          await approve(bridgeAddress[chainId], constants.MASK_250, tokenContract, ethereumAccount);
        }
      }
      setProgress(PROGRESS.deposit(amount, symbol));
      const depositPromise = depositHandler(
        starknetAccount,
        amount,
        bridgeContract,
        ethereumAccount
      );
      const depositEventPromise = waitForLogMessageToL2(bridgeContract.options.address);
      const [{transactionHash}, starknetTxHash] = await Promise.all([
        depositPromise,
        depositEventPromise
      ]);
      setIsLoading(false);
      setData({
        type: ActionType.TRANSFER_TO_STARKNET,
        name,
        symbol,
        amount,
        eth_hash: transactionHash,
        starknet_hash: starknetTxHash
      });
    } catch (ex) {
      setIsLoading(false);
      setError(ex);
    }
  };

  const transferFromStarknet = async (
    amount,
    bridgeContract,
    tokenContract,
    ethereumBridgeContract
  ) => {
    const {symbol} = selectedToken;
    resetState();
    try {
      setIsLoading(true);
      setProgress(PROGRESS.initiateWithdraw(amount, symbol));
      const initiateWithdrawTxResponse = await starknet_initiateWithdraw(
        ethereumAccount,
        amount,
        bridgeContract,
        tokenContract
      );
      const waitForAcceptPromise = starknet_waitForTransaction(
        initiateWithdrawTxResponse.transaction_hash
      );
      const waitForMsgPromise = waitForLogMessageToL1();
      setProgress(PROGRESS.waitForAccept());
      await waitForAcceptPromise;
      setProgress(PROGRESS.waitForEvent());
      await waitForMsgPromise;
      setProgress(PROGRESS.withdraw(amount, symbol, ethereumAccount));
      const withdrawReceipt = await eth_withdraw(
        ethereumAccount,
        amount,
        ethereumBridgeContract,
        tokenContract
      );
      setIsLoading(false);
      setProgress(null);
      setData([{}, withdrawReceipt]);
    } catch (ex) {
      setIsLoading(false);
      setProgress(null);
      setError(ex);
    }
  };

  const transferTokenFromStarknet = useCallback(
    async amount => {
      const {tokenAddress, bridgeAddress, symbol} = selectedToken;
      const ethereumToken = getEthereumToken(symbol);
      const tokenContract = getTokenContract(tokenAddress);
      const tokenBridgeContract = getTokenBridgeContract(bridgeAddress);
      const ethereumTokenBridgeContract = getEthereumTokenBridgeContract(
        ethereumToken.bridgeAddress
      );
      return await transferFromStarknet(
        amount,
        tokenBridgeContract,
        tokenContract,
        ethereumTokenBridgeContract
      );
    },
    [ethereumAccount, starknetAccount]
  );

  const transferTokenToStarknet = useCallback(
    async amount => {
      if (!isEth(selectedToken)) {
        const {tokenAddress, bridgeAddress} = selectedToken;
        const tokenContract = getTokenContract(tokenAddress);
        const tokenBridgeContract = getTokenBridgeContract(bridgeAddress);
        return await transferToStarknet(amount, eth_deposit, tokenBridgeContract, tokenContract);
      }
      return await transferToStarknet(amount, eth_depositEth, ethBridgeContract, null);
    },
    [ethereumAccount, starknetAccount, selectedToken]
  );

  useEffect(() => {
    resetState();
  }, [action]);

  return {
    transferTokenToStarknet,
    transferTokenFromStarknet,
    isLoading,
    progress,
    error,
    data
  };
};
