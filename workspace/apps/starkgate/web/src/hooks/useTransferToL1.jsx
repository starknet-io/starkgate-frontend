import {useCallback} from 'react';
import {TransactionExecutionStatus} from 'starknet';

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
import {useSelectedToken, useTransferLog, useWallets} from '@providers';
import {TransferType} from '@starkgate/shared';
import {useLogger} from '@starkware-webapps/ui';
import {promiseHandler} from '@starkware-webapps/utils';

export const useTransferToL1 = () => {
  const logger = useLogger('useTransferToL1');
  const [trackInitiated, trackSuccess, trackError, , trackAutoWithdrawal] =
    useTransferToL1Tracking();
  const {initiateWithdraw, initiateTeleport} = useBridgeContractAPI();
  const {ethereumAccount, getStarknetProvider, starknetAccount, starknetWalletName} = useWallets();
  const selectedToken = useSelectedToken();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async (amount, autoWithdrawal, fastWithdrawal) => {
      const {name, symbol} = selectedToken;
      const provider = getStarknetProvider();

      const sendInitiateWithdraw = () => {
        const trackData = {
          fromAddress: starknetAccount,
          toAddress: ethereumAccount,
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
              recipient: ethereumAccount,
              amount
            })
          : initiateWithdraw({
              recipient: ethereumAccount,
              amount,
              autoWithdrawal
            });
      };

      try {
        logger.log('TransferToL1 called');
        handleProgress(
          progressOptions.waitForConfirm(
            starknetWalletName,
            stepOf(TransferStep.CONFIRM_TX, TransferToL1Steps)
          )
        );
        logger.log('Calling initiate withdraw');
        const {transaction_hash: l2TxHash} = await sendInitiateWithdraw();
        const transferData = {
          type: TransferType.WITHDRAWAL,
          sender: starknetAccount,
          recipient: ethereumAccount,
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
        await provider.waitForTransaction(l2TxHash, {
          successStates: [TransactionExecutionStatus.SUCCEEDED]
        });
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
      ethereumAccount,
      starknetAccount,
      starknetWalletName,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      selectedToken,
      getStarknetProvider
    ]
  );
};

export const useCompleteTransferToL1 = () => {
  const logger = useLogger('useCompleteTransferToL1');
  const [trackInitiated, trackSuccess, trackError] = useCompleteTransferToL1Tracking();
  const {withdraw, requestMint} = useBridgeContractAPI();
  const {ethereumAccount, ethereumWalletName} = useWallets();
  const {handleProgress, handleData, handleError} = useTransfer(CompleteTransferToL1Steps);
  const progressOptions = useTransferProgress();
  const {refetch} = useTransferLog();

  return useCallback(
    async transfer => {
      const {symbol, amount, l2TxHash, customData, fastWithdrawal} = transfer;

      const sendWithdrawal = async () => {
        trackInitiated({
          toAddress: ethereumAccount,
          l2TxHash,
          amount,
          symbol,
          fastWithdrawal
        });
        const withdrawalHandler = fastWithdrawal
          ? requestMint({
              amount,
              customData
            })
          : withdraw({
              recipient: ethereumAccount,
              symbol,
              amount
            });
        const [tx, error] = await promiseHandler(withdrawalHandler);
        if (!error) {
          logger.log('Tx signed', {transactionHash: tx.hash});
          handleProgress(
            progressOptions.withdraw(
              amount,
              symbol,
              stepOf(TransferStep.WITHDRAW, CompleteTransferToL1Steps)
            )
          );
          return tx;
        }
        throw error;
      };

      const handleWithdrawalSuccess = receipt => {
        const {transactionHash: l1TxHash} = receipt;
        trackSuccess({l1TxHash});
        const transferData = {...transfer, l1TxHash};
        handleData(transferData);
        refetch();
      };

      try {
        logger.log('CompleteTransferToL1 called');
        handleProgress(
          progressOptions.waitForConfirm(
            ethereumWalletName,
            stepOf(TransferStep.CONFIRM_TX, CompleteTransferToL1Steps)
          )
        );
        const tx = await sendWithdrawal();
        const receipt = await tx.wait();
        logger.log('Withdrawal tx mined', {receipt});
        handleWithdrawalSuccess(receipt);
      } catch (ex) {
        trackError({error: ex});
        logger.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      withdraw,
      ethereumAccount,
      ethereumWalletName,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions
    ]
  );
};
