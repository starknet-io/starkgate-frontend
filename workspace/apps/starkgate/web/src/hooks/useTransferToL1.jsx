import {getStarknet} from 'get-starknet';
import {useCallback} from 'react';

import {
  CompleteTransferToL1Steps,
  TransferError,
  TransferStep,
  TransferToL1Steps,
  stepOf
} from '@enums';
import {
  useBridgeContractAPI,
  useCompleteTransferToL1Tracking,
  useTransfer,
  useTransferProgress,
  useTransferToL1Tracking
} from '@hooks';
import {useL1Wallet, useL2Wallet, useSelectedToken, useTransferLog} from '@providers';
import {TransferType} from '@starkgate/shared';
import {EventName, TransactionStatus} from '@starkware-webapps/enums';
import {useLogger} from '@starkware-webapps/ui';
import {waitForTransaction} from '@starkware-webapps/web3-utils';

export const useTransferToL1 = () => {
  const logger = useLogger('useTransferToL1');
  const [trackInitiated, trackSuccess, trackError, , trackAutoWithdrawal] =
    useTransferToL1Tracking();
  const {initiateWithdraw, initiateTeleport} = useBridgeContractAPI();
  const {account: accountL1} = useL1Wallet();
  const {account: accountL2, config: configL2} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async (amount, autoWithdrawal, fastWithdrawal) => {
      const {name, symbol} = selectedToken;

      const sendInitiateWithdraw = () => {
        const trackData = {
          fromAddress: accountL2,
          toAddress: accountL1,
          amount,
          symbol
        };
        autoWithdrawal
          ? trackAutoWithdrawal(trackData)
          : trackInitiated({
              ...trackData,
              fastWithdrawal
            });
        return fastWithdrawal
          ? initiateTeleport({
              recipient: accountL1,
              amount
            })
          : initiateWithdraw({
              recipient: accountL1,
              amount,
              autoWithdrawal
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
        const {transaction_hash: l2TxHash} = await sendInitiateWithdraw();
        const transferData = {
          type: TransferType.WITHDRAWAL,
          sender: accountL2,
          recipient: accountL1,
          l2TxTimestamp: new Date().getTime(),
          name,
          symbol,
          amount,
          l2TxHash,
          fastWithdrawal,
          autoWithdrawal
        };
        logger.log('Tx hash received', {l2TxHash});
        handleProgress(
          progressOptions.initiateWithdraw(
            amount,
            symbol,
            stepOf(TransferStep.INITIATE_WITHDRAW, TransferToL1Steps)
          )
        );
        logger.log('Waiting for tx to be received on L2');
        await waitForTransaction(getStarknet().provider, l2TxHash, TransactionStatus.RECEIVED);
        logger.log('Done', {l2TxHash});
        trackSuccess({l2TxHash, fastWithdrawal, autoWithdrawal});
        handleData(transferData);
      } catch (ex) {
        logger.error(ex.message, ex);
        trackError({error: ex, fastWithdrawal, autoWithdrawal});
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
  const {withdraw, requestMint} = useBridgeContractAPI();
  const {account: accountL1, config: configL1} = useL1Wallet();
  const {handleProgress, handleData, handleError} = useTransfer(CompleteTransferToL1Steps);
  const progressOptions = useTransferProgress();
  const {refetch} = useTransferLog();

  return useCallback(
    async transfer => {
      const {symbol, amount, l2TxHash, customData, fastWithdrawal} = transfer;

      const sendWithdrawal = () => {
        trackInitiated({
          toAddress: accountL1,
          l2TxHash,
          amount,
          symbol,
          fastWithdrawal
        });
        if (fastWithdrawal) {
          logger.log('Calling requestMint');
          return requestMint({
            amount,
            customData,
            emitter: onTransactionHash
          });
        } else {
          logger.log('Calling withdraw');
          return withdraw({
            recipient: accountL1,
            symbol,
            amount,
            emitter: onTransactionHash
          });
        }
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
        const {transactionHash: l1TxHash} = event;
        trackSuccess({l1TxHash});
        const transferData = {...transfer, l1TxHash};
        handleData(transferData);
        refetch();
      };

      try {
        logger.log('CompleteTransferToL1 called');
        handleProgress(
          progressOptions.waitForConfirm(
            configL1.name,
            stepOf(TransferStep.CONFIRM_TX, CompleteTransferToL1Steps)
          )
        );
        const receipt = await sendWithdrawal();
        onWithdrawal(receipt.events[fastWithdrawal ? 0 : EventName.L1.LOG_WITHDRAWAL]);
      } catch (ex) {
        trackError({error: ex});
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
