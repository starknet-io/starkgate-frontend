import {useCallback} from 'react';

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
import {starknet} from '../libs';
import {useL1Token, useTokens} from '../providers/TokensProvider';
import {useTransfers} from '../providers/TransfersProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import {isEth} from '../utils';
import blockchainUtils from '../utils/blockchain';
import {useL1TokenBridgeContract, useTokenBridgeContract, useTokenContract} from './useContract';
import {useLogMessageToL2Listener} from './useEventListener';
import {useLogger} from './useLogger';
import {useTransferProgress} from './useTransferProgress';

const HOOK_MODULE = 'useTransfer';

export const useTransferToL2 = () => {
  const logger = useLogger(`${HOOK_MODULE}:useTransferToL2`);
  const {account: l1Account, chainId, config: l1Config} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const progressOptions = useTransferProgress();
  const addLogMessageToL2Listener = useLogMessageToL2Listener();

  return useCallback(
    async amount => {
      try {
        logger.log('TransferToL2 called');
        const {symbol, decimals, tokenAddress, bridgeAddress, name} = selectedToken;
        const isEthToken = isEth(symbol);
        const bridgeContract = getTokenBridgeContract(bridgeAddress);
        const depositHandler = isEthToken ? depositEth : deposit;
        logger.log('Prepared contract and handler', {isEthToken, bridgeContract, depositHandler});
        if (!isEthToken) {
          logger.log('Token needs approval', {isEthToken});
          const tokenContract = getTokenContract(tokenAddress);
          handleProgress(progressOptions.approval(symbol));
          const allow = await allowance({
            owner: l1Account,
            spender: bridgeAddress[chainId],
            decimals,
            contract: tokenContract
          });
          logger.log('Current allow value', {allow});
          if (allow < amount) {
            logger.log('Allow value is smaller then amount, sending approve tx', {amount});
            await approve({
              spender: bridgeAddress[chainId],
              value: starknet.constants.MASK_250,
              contract: tokenContract,
              options: {from: l1Account}
            });
          }
        }
        handleProgress(progressOptions.waitForConfirm(l1Config.name));
        const logMessageToL2EventPromise = addLogMessageToL2Listener();
        logger.log('Calling deposit');
        const depositPromise = await depositHandler({
          recipient: l2Account,
          amount,
          decimals,
          contract: bridgeContract,
          options: {from: l1Account},
          emitter: (error, transactionHash) => {
            if (!error) {
              logger.log('Tx hash received', {transactionHash});
              handleProgress(progressOptions.deposit(amount, symbol));
            }
          }
        });
        const [{transactionHash: l1hash}, l2hash] = await Promise.all([
          depositPromise,
          logMessageToL2EventPromise
        ]);
        logger.log('Done', {l1hash, l2hash});
        handleData({
          type: ActionType.TRANSFER_TO_L2,
          sender: l1Account,
          recipient: l2Account,
          name,
          symbol,
          amount,
          l1hash,
          l2hash
        });
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      selectedToken,
      addLogMessageToL2Listener,
      chainId,
      l1Account,
      l1Config,
      getTokenBridgeContract,
      getTokenContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      l2Account
    ]
  );
};

export const useTransferToL1 = () => {
  const logger = useLogger(`${HOOK_MODULE}:useTransferToL1`);
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const getTokenBridgeContract = useTokenBridgeContract();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();

  return useCallback(
    async amount => {
      try {
        logger.log('TransferToL1 called');
        const {decimals, bridgeAddress, name, symbol} = selectedToken;
        const bridgeContract = getTokenBridgeContract(bridgeAddress);
        logger.log('Prepared contract', {bridgeContract});
        handleProgress(progressOptions.waitForConfirm(l2Config.name));
        logger.log('Calling initiate withdraw');
        const {transaction_hash} = await initiateWithdraw({
          recipient: l1Account,
          amount,
          decimals,
          contract: bridgeContract
        });
        logger.log('Tx hash received', {transaction_hash});
        handleProgress(progressOptions.initiateWithdraw(amount, symbol));
        logger.log('Waiting for tx to be received on L2');
        await blockchainUtils.starknet.waitForTransaction(
          transaction_hash,
          TransactionStatus.RECEIVED
        );
        handleProgress(progressOptions.waitForAccept());
        logger.log('Waiting for tx to be accepted on L2');
        await blockchainUtils.starknet.waitForTransaction(
          transaction_hash,
          TransactionStatus.PENDING
        );
        logger.log('Done', {transaction_hash});
        handleData({
          type: ActionType.TRANSFER_TO_L1,
          sender: l2Account,
          recipient: l1Account,
          name,
          symbol,
          amount,
          l2hash: transaction_hash
        });
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      l1Account,
      getTokenBridgeContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      selectedToken,
      l2Account,
      l2Config
    ]
  );
};

export const useCompleteTransferToL1 = () => {
  const logger = useLogger(`${HOOK_MODULE}:useCompleteTransferToL1`);
  const {account: l1Account, config: l1Config} = useL1Wallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();
  const getL1Token = useL1Token();
  const getL1TokenBridgeContract = useL1TokenBridgeContract();

  return useCallback(
    async transfer => {
      try {
        logger.log('CompleteTransferToL1 called');
        const {symbol, amount} = transfer;
        const l1Token = getL1Token(symbol);
        const {bridgeAddress, decimals} = l1Token;
        const tokenBridgeContract = getL1TokenBridgeContract(bridgeAddress);
        logger.log('Prepared token and bridge contract', {l1Token, tokenBridgeContract});
        handleProgress(progressOptions.waitForConfirm(l1Config.name));
        logger.log('Calling withdraw');
        const {transactionHash} = await withdraw({
          recipient: l1Account,
          amount,
          decimals,
          contract: tokenBridgeContract,
          emitter: (error, transactionHash) => {
            if (!error) {
              logger.log('Tx hash received', {transactionHash});
              handleProgress(progressOptions.withdraw(amount, symbol));
            }
          }
        });
        logger.log('Done', {transactionHash});
        handleData({...transfer, l1hash: transactionHash});
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      l1Account,
      l1Config,
      getL1Token,
      getL1TokenBridgeContract,
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
