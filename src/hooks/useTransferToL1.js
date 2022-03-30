import {useCallback} from 'react';

import {track, TrackEvent} from '../analytics';
import {initiateWithdraw, withdraw} from '../api/bridge';
import {ActionType, TransactionStatus} from '../enums';
import {useLogWithdrawalListener} from '../providers/EventManagerProvider';
import {useL1Token} from '../providers/TokensProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';
import {useL1TokenBridgeContract, useTokenBridgeContract} from './useContract';
import {useLogger} from './useLogger';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL1 = () => {
  const logger = useLogger('useTransferToL1');
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const getTokenBridgeContract = useTokenBridgeContract();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();

  return useCallback(
    async amount => {
      const {decimals, bridgeAddress, name, symbol} = selectedToken;

      const sendInitiateWithdraw = () => {
        track(TrackEvent.TRANSFER.TRANSFER_TO_L1_INITIATED, {
          from_address: l2Account,
          to_address: l1Account,
          amount,
          symbol
        });
        const bridgeContract = getTokenBridgeContract(bridgeAddress);
        return initiateWithdraw({
          recipient: l1Account,
          contract: bridgeContract,
          amount,
          decimals
        });
      };

      try {
        logger.log('TransferToL1 called');
        handleProgress(progressOptions.waitForConfirm(l2Config.name));
        logger.log('Calling initiate withdraw');
        const {transaction_hash: l2hash} = await sendInitiateWithdraw();
        logger.log('Tx hash received', {l2hash});
        handleProgress(progressOptions.initiateWithdraw(amount, symbol));
        logger.log('Waiting for tx to be received on L2');
        await utils.blockchain.starknet.waitForTransaction(l2hash, TransactionStatus.RECEIVED);
        logger.log('Done', {l2hash});
        track(TrackEvent.TRANSFER.TRANSFER_TO_L1_SUCCESS, {
          l2hash
        });
        handleData({
          type: ActionType.TRANSFER_TO_L1,
          sender: l2Account,
          recipient: l1Account,
          name,
          symbol,
          amount,
          l2hash
        });
      } catch (ex) {
        logger.error(ex.message, {ex});
        track(TrackEvent.TRANSFER.TRANSFER_TO_L1_ERROR, ex);
        handleError(progressOptions.error(ex));
      }
    },
    [
      l1Account,
      l2Account,
      getTokenBridgeContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      selectedToken,
      l2Config
    ]
  );
};

export const useCompleteTransferToL1 = () => {
  const logger = useLogger('useCompleteTransferToL1');
  const {account: l1Account, config: l1Config} = useL1Wallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();
  const getL1Token = useL1Token();
  const getL1TokenBridgeContract = useL1TokenBridgeContract();
  const addLogWithdrawalListener = useLogWithdrawalListener();

  return useCallback(
    async transfer => {
      const {symbol, amount, l2hash} = transfer;

      const sendWithdrawal = () => {
        track(TrackEvent.TRANSFER.COMPLETE_TRANSFER_TO_L1_INITIATED, {
          to_address: l1Account,
          l2hash,
          amount,
          symbol
        });
        const {bridgeAddress, decimals} = getL1Token(symbol);
        const tokenBridgeContract = getL1TokenBridgeContract(bridgeAddress);
        return withdraw({
          recipient: l1Account,
          contract: tokenBridgeContract,
          emitter: onTransactionHash,
          amount,
          decimals
        });
      };

      const onTransactionHash = (error, transactionHash) => {
        if (error) {
          track(TrackEvent.TRANSFER.COMPLETE_TRANSFER_TO_L1_REJECT, error);
          logger.error(error.message);
          handleError(progressOptions.error(error));
          return;
        }
        logger.log('Tx signed', {transactionHash});
        handleProgress(progressOptions.withdraw(amount, symbol));
      };

      const onLogWithdrawal = (error, event) => {
        if (error) {
          track(TrackEvent.TRANSFER.COMPLETE_TRANSFER_TO_L1_ERROR, error);
          logger.error(error.message);
          handleError(progressOptions.error(error));
          return;
        }
        const {transactionHash: l1hash} = event;
        logger.log('Done', l1hash);
        track(TrackEvent.TRANSFER.COMPLETE_TRANSFER_TO_L1_SUCCESS, {l1hash});
        handleData({...transfer, l1hash});
      };

      try {
        logger.log('CompleteTransferToL1 called');
        handleProgress(progressOptions.waitForConfirm(l1Config.name));
        addLogWithdrawalListener(onLogWithdrawal);
        logger.log('Calling withdraw');
        sendWithdrawal();
      } catch (ex) {
        track(TrackEvent.TRANSFER.COMPLETE_TRANSFER_TO_L1_ERROR, ex);
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
      progressOptions,
      addLogWithdrawalListener
    ]
  );
};
