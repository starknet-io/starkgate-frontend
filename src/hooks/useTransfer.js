import {useCallback} from 'react';
import {constants} from 'starknet';

import {deposit, depositEth, initiateWithdraw, withdraw} from '../api/bridge';
import {allowance, approve} from '../api/erc20';
import {
  useErrorModal,
  useHideModal,
  useProgressModal,
  useTransactionSubmittedModal
} from '../components/Features/ModalProvider/ModalProvider.hooks';
import {useAmount, useSelectedToken} from '../components/Features/Transfer/Transfer.hooks';
import {ActionType, TransactionStatus} from '../enums';
import {useEthereumToken, useTokens} from '../providers/TokensProvider';
import {useTransfers} from '../providers/TransfersProvider';
import {useEthereumWallet, useStarknetWallet} from '../providers/WalletsProvider';
import {isEth} from '../utils';
import {starknet_waitForTransaction} from '../utils/contract';
import {
  useEthBridgeContract,
  useEthereumTokenBridgeContract,
  useTokenBridgeContract,
  useTokenContract
} from './useContract';
import {useLogDepositListener, useLogMessageToL2Listener} from './useEventListener';
import {useLogger} from './useLogger';
import {useTransferProgress} from './useTransferProgress';

const HOOK_MODULE = 'useTransfer';

export const useTransferToL2 = () => {
  const logger = useLogger(`${HOOK_MODULE}:useTransferToL2`);
  const {account: ethereumAccount, chainId, config: ethereumConfig} = useEthereumWallet();
  const {account: starknetAccount} = useStarknetWallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const selectedToken = useSelectedToken();
  const ethBridgeContract = useEthBridgeContract();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const progressOptions = useTransferProgress();
  const addLogDepositListener = useLogDepositListener();
  const addLogMessageToL2Listener = useLogMessageToL2Listener();

  return useCallback(
    async amount => {
      try {
        logger.log('TransferToL2 called');
        const {symbol, tokenAddress, bridgeAddress, name} = selectedToken;
        const isEthToken = isEth(symbol);
        const bridgeContract = isEthToken
          ? ethBridgeContract
          : getTokenBridgeContract(bridgeAddress);
        const depositHandler = isEthToken ? depositEth : deposit;
        logger.log('Prepared contract and handler', {isEthToken, bridgeContract, depositHandler});
        if (!isEthToken) {
          logger.log('Token needs approval', {isEthToken});
          const tokenContract = getTokenContract(tokenAddress);
          handleProgress(progressOptions.approval(symbol));
          const allow = await allowance(ethereumAccount, bridgeAddress[chainId], tokenContract);
          logger.log('Current allow value', {allow});
          if (allow < amount) {
            logger.log('Allow value is smaller then amount, sending approve tx', {amount});
            await approve(
              bridgeAddress[chainId],
              constants.MASK_250,
              tokenContract,
              ethereumAccount
            );
          }
        }
        handleProgress(progressOptions.waitForConfirm(ethereumConfig.name));
        logger.log('Register events');
        const logMessageToL2EventPromise = addLogMessageToL2Listener();
        const depositEventPromise = addLogDepositListener();
        logger.log('Calling deposit');
        await depositHandler(
          starknetAccount,
          amount,
          bridgeContract,
          ethereumAccount,
          (error, transactionHash) => {
            if (!error) {
              logger.log('Tx hash received', {transactionHash});
              handleProgress(progressOptions.deposit(amount, symbol));
            }
          }
        );
        const [l1hash, l2hash] = await Promise.all([
          depositEventPromise,
          logMessageToL2EventPromise
        ]);
        logger.log('Done', {l1hash, l2hash});
        handleData({
          type: ActionType.TRANSFER_TO_STARKNET,
          sender: ethereumAccount,
          recipient: starknetAccount,
          name,
          symbol,
          amount,
          eth_hash: l1hash,
          starknet_hash: l2hash
        });
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      selectedToken,
      addLogDepositListener,
      addLogMessageToL2Listener,
      chainId,
      ethBridgeContract,
      ethereumAccount,
      ethereumConfig,
      getTokenBridgeContract,
      getTokenContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      starknetAccount
    ]
  );
};

export const useTransferToL1 = () => {
  const logger = useLogger(`${HOOK_MODULE}:useTransferToL1`);
  const {account: ethereumAccount} = useEthereumWallet();
  const {account: starknetAccount, config: starknetConfig} = useStarknetWallet();
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();

  return useCallback(
    async amount => {
      try {
        logger.log('TransferToL1 called');
        const {tokenAddress, bridgeAddress, name, symbol} = selectedToken;
        const tokenContract = getTokenContract(tokenAddress);
        const bridgeContract = getTokenBridgeContract(bridgeAddress);
        logger.log('Prepared contracts', {bridgeContract, tokenContract});
        handleProgress(progressOptions.waitForConfirm(starknetConfig.name));
        logger.log('Calling initiate withdraw');
        const {transaction_hash} = await initiateWithdraw(
          ethereumAccount,
          amount,
          bridgeContract,
          tokenContract
        );
        logger.log('Tx hash received', {transaction_hash});
        handleProgress(progressOptions.initiateWithdraw(amount, symbol));
        logger.log('Waiting for tx to be received on L2');
        await starknet_waitForTransaction(transaction_hash, TransactionStatus.RECEIVED);
        handleProgress(progressOptions.waitForAccept());
        logger.log('Waiting for tx to be accepted on L2');
        await starknet_waitForTransaction(transaction_hash);
        logger.log('Done', {transaction_hash});
        handleData({
          type: ActionType.TRANSFER_FROM_STARKNET,
          sender: starknetAccount,
          recipient: ethereumAccount,
          name,
          symbol,
          amount,
          starknet_hash: transaction_hash
        });
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      ethereumAccount,
      getTokenBridgeContract,
      getTokenContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      selectedToken,
      starknetAccount,
      starknetConfig
    ]
  );
};

export const useCompleteTransferToL1 = () => {
  const logger = useLogger(`${HOOK_MODULE}:useCompleteTransferToL1`);
  const {account: ethereumAccount, config: ethereumConfig} = useEthereumWallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();
  const getEthereumToken = useEthereumToken();
  const ethBridgeContract = useEthBridgeContract();
  const getEthereumTokenBridgeContract = useEthereumTokenBridgeContract();

  return useCallback(
    async transfer => {
      try {
        logger.log('CompleteTransferToL1 called');
        const {symbol, amount} = transfer;
        const ethereumToken = getEthereumToken(symbol);
        const tokenBridgeContract = isEth(symbol)
          ? ethBridgeContract
          : getEthereumTokenBridgeContract(ethereumToken.bridgeAddress);
        logger.log('Prepared token and bridge contract', {ethereumToken, tokenBridgeContract});
        handleProgress(progressOptions.waitForConfirm(ethereumConfig.name));
        logger.log('Calling withdraw');
        const {transactionHash} = await withdraw(
          ethereumAccount,
          amount,
          tokenBridgeContract,
          (error, transactionHash) => {
            if (!error) {
              logger.log('Tx hash received', {transactionHash});
              handleProgress(progressOptions.withdraw(amount, symbol));
            }
          }
        );
        logger.log('Done', {transactionHash});
        handleData({...transfer, eth_hash: transactionHash});
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      ethBridgeContract,
      ethereumAccount,
      ethereumConfig,
      getEthereumToken,
      getEthereumTokenBridgeContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions
    ]
  );
};

const useTransfer = () => {
  const showProgressModal = useProgressModal();
  const showErrorModal = useErrorModal();
  const hideModal = useHideModal();
  const showTransactionSubmittedModal = useTransactionSubmittedModal();
  const {addTransfer} = useTransfers();
  const {updateTokens} = useTokens();
  const [, , clearAmount] = useAmount();

  const handleProgress = progress => {
    showProgressModal(progress.type, progress.message);
  };

  const handleError = error => {
    hideModal();
    showErrorModal(error.type, error.message);
  };

  const handleData = data => {
    addTransfer(data);
    showTransactionSubmittedModal(data);
    updateTokens();
    clearAmount();
  };

  return {
    handleProgress,
    handleError,
    handleData
  };
};
