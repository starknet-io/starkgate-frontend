import {
  ActionType,
  EventName,
  TransactionStatus
} from '@starkware-industries/starkware-commons-js-enums';
import {useCallback} from 'react';

import {
  CompleteTransferToL1Steps,
  stepOf,
  TransferError,
  TransferStep,
  TransferToL1Steps
} from '../enums';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import {waitForTransaction} from '../utils';
import {useBridgeContractAPI} from './useBridgeContractAPI';
import {useLogger} from './useLogger';
import {useCompleteTransferToL1Tracking, useTransferToL1Tracking} from './useTracking';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL1 = () => {
  const logger = useLogger('useTransferToL1');
  const [trackInitiated, trackSuccess, trackError] = useTransferToL1Tracking();
  const {initiateWithdraw} = useBridgeContractAPI();
  const {account: accountL1} = useL1Wallet();
  const {account: accountL2, config: configL2} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async amount => {
      const {name, symbol} = selectedToken;

      const sendInitiateWithdraw = () => {
        trackInitiated({
          from_address: accountL2,
          to_address: accountL1,
          amount,
          symbol
        });
        return initiateWithdraw({
          recipient: accountL1,
          amount
        });
      };

      try {
        logger.log('TransferToL1 called');
        handleProgress(
          progressOptions.waitForConfirm(
            configL2.name,
            stepOf(TransferStep.CONFIRM_TX, TransferToL1Steps)
          )
        );
        logger.log('Calling initiate withdraw');
        const {transaction_hash: l2hash} = await sendInitiateWithdraw();
        logger.log('Tx hash received', {l2hash});
        handleProgress(
          progressOptions.initiateWithdraw(
            amount,
            symbol,
            stepOf(TransferStep.INITIATE_WITHDRAW, TransferToL1Steps)
          )
        );
        logger.log('Waiting for tx to be received on L2');
        await waitForTransaction(l2hash, TransactionStatus.RECEIVED);
        logger.log('Done', {l2hash});
        trackSuccess(l2hash);
        handleData({
          type: ActionType.TRANSFER_TO_L1,
          sender: accountL2,
          recipient: accountL1,
          name,
          symbol,
          amount,
          l2hash
        });
      } catch (ex) {
        logger.error(ex.message, ex);
        trackError(ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      initiateWithdraw,
      accountL1,
      accountL2,
      configL2,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      selectedToken
    ]
  );
};

export const useCompleteTransferToL1 = () => {
  const logger = useLogger('useCompleteTransferToL1');
  const [trackInitiated, trackSuccess, trackError] = useCompleteTransferToL1Tracking();
  const {withdraw} = useBridgeContractAPI();
  const {account: accountL1, config: configL1} = useL1Wallet();
  const {handleProgress, handleData, handleError} = useTransfer(CompleteTransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async transfer => {
      const {symbol, amount, l2hash} = transfer;

      const sendWithdrawal = () => {
        trackInitiated({
          to_address: accountL1,
          l2hash,
          amount,
          symbol
        });
        return withdraw({
          recipient: accountL1,
          symbol,
          amount,
          emitter: onTransactionHash
        });
      };

      const onTransactionHash = (error, transactionHash) => {
        if (!error) {
          logger.log('Tx signed', {transactionHash});
          handleProgress(
            progressOptions.withdraw(
              amount,
              symbol,
              stepOf(TransferStep.WITHDRAW, CompleteTransferToL1Steps)
            )
          );
        }
      };

      const onWithdrawal = event => {
        logger.log('Withdrawal event dispatched', event);
        const {transactionHash: l1hash} = event;
        trackSuccess(l1hash);
        handleData({...transfer, l1hash});
      };

      try {
        logger.log('CompleteTransferToL1 called');
        handleProgress(
          progressOptions.waitForConfirm(
            configL1.name,
            stepOf(TransferStep.CONFIRM_TX, CompleteTransferToL1Steps)
          )
        );
        logger.log('Calling withdraw');
        const receipt = await sendWithdrawal();
        onWithdrawal(receipt.events[EventName.L1.LOG_WITHDRAWAL]);
      } catch (ex) {
        trackError(ex);
        logger.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      withdraw,
      accountL1,
      configL1,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions
    ]
  );
};
