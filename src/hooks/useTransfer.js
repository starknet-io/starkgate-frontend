import {useCallback, useEffect, useState} from 'react';
import {constants, stark} from 'starknet';

import {eth_deposit, eth_depositEth, eth_withdraw, starknet_initiateWithdraw} from '../api/bridge';
import {allowance, approve} from '../api/erc20';
import {
  useErrorModal,
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../components/Features/ModalProvider/ModalProvider.hooks';
import {
  useAmount,
  useSelectedToken,
  useTransferData
} from '../components/Features/Transfer/Transfer.hooks';
import {ActionType} from '../enums';
import {useEthereumToken, useStarknetToken, useTokens} from '../providers/TokensProvider';
import {useTransfers} from '../providers/TransfersProvider';
import {useEthereumWallet, useStarknetWallet} from '../providers/WalletsProvider';
import {evaluate, getString, hashEquals, isEth, txHash} from '../utils';
import {eth_listenOnce} from '../utils/contract';
import {
  useEthBridgeContract,
  useEthereumTokenBridgeContract,
  useMessagingContract,
  useTokenBridgeContract,
  useTokenContract
} from './useContract';

export const useTransfer = () => {
  const  {
      error_title,
      approval,
      deposit,
      initiateWithdraw,
      waitForAccept,
      withdraw
  } = getString('modals.transferProgress');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const {account: ethereumAccount, chainId} = useEthereumWallet();
  const {account: starknetAccount} = useStarknetWallet();
  const {action} = useTransferData();
  const {addTransfer} = useTransfers();
  const {updateTokens} = useTokens();
  const [, , clearAmount] = useAmount();
  const showProgressModal = useProgressModal();
  const showErrorModal = useErrorModal(error_title);
  const hideModal = useHideModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();
  const selectedToken = useSelectedToken();
  const ethBridgeContract = useEthBridgeContract();
  const messagingContract = useMessagingContract();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const getEthereumToken = useEthereumToken();
  const getStarknetToken = useStarknetToken();
  const getEthereumTokenBridgeContract = useEthereumTokenBridgeContract();
  const progressOptions = {
    approval: symbol => {
      const message = evaluate(approval.message, {symbol});
      return {
        type: approval.type,
        message
      };
    },
    deposit: (amount, symbol) => {
      const message = evaluate(deposit.message, {amount, symbol});
      return {
        type: deposit.type,
        message
      };
    },
    initiateWithdraw: (amount, symbol) => {
      const message = evaluate(initiateWithdraw.message, {amount, symbol});
      return {
        type: initiateWithdraw.type,
        message
      };
    },
    waitForAccept: () => ({
      type: waitForAccept.type,
      message: waitForAccept.message
    }),
    withdraw: (amount, symbol) => {
      const message = evaluate(withdraw.message, {amount, symbol});
      return {
        type: withdraw.type,
        message
      };
    }
  };

  useEffect(() => {
    resetState();
  }, [action]);

  useEffect(() => {
    if (isLoading) {
      progress && showProgressModal(progress.type, progress.message);
    } else if (error) {
      hideModal();
      showErrorModal(error.message);
    } else if (data) {
      showTransactionSubmittedModal(data);
      addTransfer(data);
      updateTokens();
      clearAmount();
    }
  }, [progress, data, error, isLoading]);

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

  const transferToStarknet = async (amount, depositHandler, bridgeContract, tokenContract) => {
    const {bridgeAddress, symbol, name} = selectedToken;
    resetState();
    try {
      setIsLoading(true);
      if (!isEth(symbol)) {
        setProgress(progressOptions.approval(symbol));
        const allow = await allowance(ethereumAccount, bridgeAddress[chainId], tokenContract);
        if (allow < amount) {
          await approve(bridgeAddress[chainId], constants.MASK_250, tokenContract, ethereumAccount);
        }
      }
      setProgress(progressOptions.deposit(amount, symbol));
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
        sender: ethereumAccount,
        recipient: starknetAccount,
        name,
        symbol,
        amount,
        eth_hash: transactionHash,
        starknet_hash: starknetTxHash
      });
      return data;
    } catch (ex) {
      setIsLoading(false);
      setError(ex);
      return Promise.reject(ex);
    }
  };

  const transferFromStarknet = async (amount, bridgeContract, tokenContract) => {
    resetState();
    try {
      const {name, symbol} = selectedToken;
      setIsLoading(true);
      setProgress(progressOptions.initiateWithdraw(amount, symbol));
      const {transaction_hash} = await starknet_initiateWithdraw(
        ethereumAccount,
        amount,
        bridgeContract,
        tokenContract
      );
      setIsLoading(false);
      setData({
        type: ActionType.TRANSFER_FROM_STARKNET,
        sender: starknetAccount,
        recipient: ethereumAccount,
        name,
        symbol,
        amount,
        starknet_hash: transaction_hash
      });
      return data;
    } catch (ex) {
      setIsLoading(false);
      setError(ex);
      return Promise.reject(ex);
    }
  };

  const finalizeTransferFromStarknet = useCallback(
    async transfer => {
      resetState();
      try {
        const {symbol, amount} = transfer;
        setIsLoading(true);
        const ethereumToken = getEthereumToken(symbol);
        let tokenBridgeContract;
        if (isEth(ethereumToken)) {
          tokenBridgeContract = ethBridgeContract;
        } else {
          tokenBridgeContract = getEthereumTokenBridgeContract(ethereumToken.bridgeAddress);
        }
        setProgress(progressOptions.withdraw(amount, symbol));
        const {transactionHash} = await eth_withdraw(ethereumAccount, amount, tokenBridgeContract);
        setIsLoading(false);
        setData({...transfer, eth_hash: transactionHash});
        return data;
      } catch (ex) {
        setIsLoading(false);
        setError(ex);
        return Promise.reject(ex);
      }
    },
    [ethereumAccount]
  );

  const transferTokenFromStarknet = useCallback(
    async amount => {
      const {tokenAddress, bridgeAddress} = selectedToken;
      const tokenContract = getTokenContract(tokenAddress);
      const tokenBridgeContract = getTokenBridgeContract(bridgeAddress);
      return await transferFromStarknet(amount, tokenBridgeContract, tokenContract);
    },
    [ethereumAccount, starknetAccount, selectedToken]
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

  return {
    transferTokenToStarknet,
    transferTokenFromStarknet,
    finalizeTransferFromStarknet,
    isLoading
  };
};
