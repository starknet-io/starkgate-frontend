import {useCallback, useState} from 'react';

import {eth_deposit, eth_depositEth, eth_withdraw, starknet_initiateWithdraw} from '../api/bridge';
import {approve} from '../api/erc20';
import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {useEthereumToken} from '../providers/TokensProvider/hooks';
import {useStarknetWallet, useWallets} from '../providers/WalletsProvider/hooks';
import {isEth} from '../utils';
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
  const {selectedToken} = useTransferData();
  const ethBridgeContract = useEthBridgeContract();
  const messagingContract = useMessagingContract();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const getEthereumToken = useEthereumToken();
  const getEthereumTokenBridgeContract = useEthereumTokenBridgeContract();

  const resetState = () => {
    setError(null);
    setData(null);
    setProgress(null);
    setIsLoading(false);
  };

  const waitForLogMessageToL2 = () => {
    return new Promise((resolve, reject) => {
      eth_listenOnce(messagingContract, 'LogMessageToL2', (error, event) => {
        if (error) {
          reject(error);
        }
        resolve(event);
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

  const transferToStarknet = async (
    amount,
    depositHandler,
    bridgeContract,
    tokenContract,
    withApproval
  ) => {
    const {bridgeAddress, symbol} = selectedToken;
    resetState();
    try {
      setIsLoading(true);
      let approvalPromise = Promise.resolve();
      if (withApproval) {
        setProgress(PROGRESS.approval(symbol));
        approvalPromise = approve(bridgeAddress[chainId], amount, tokenContract, ethereumAccount);
      }
      await approvalPromise;
      setProgress(PROGRESS.deposit(amount, symbol));
      const depositPromise = depositHandler(
        starknetAccount,
        amount,
        bridgeContract,
        ethereumAccount
      );
      const depositEventPromise = waitForLogMessageToL2();
      const results = await Promise.all([depositPromise, depositEventPromise]);
      setIsLoading(false);
      setProgress(null);
      setData(results);
    } catch (ex) {
      setIsLoading(false);
      setProgress(null);
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
        return await transferToStarknet(
          amount,
          eth_deposit,
          tokenBridgeContract,
          tokenContract,
          true
        );
      }
      return await transferToStarknet(amount, eth_depositEth, ethBridgeContract, null, false);
    },
    [ethereumAccount, starknetAccount, selectedToken]
  );

  return {
    transferTokenToStarknet,
    transferTokenFromStarknet,
    isLoading,
    progress,
    error,
    data
  };
};
