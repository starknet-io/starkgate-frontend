import {useCallback} from 'react';

import {TransferError, TransferStep, TransferToL2Steps, stepOf} from '@enums';
import {
  useBridgeContractAPI,
  useConstants,
  useIsMaxTotalBalanceExceeded,
  useTokenContractAPI,
  useTransfer,
  useTransferProgress,
  useTransferToL2Tracking
} from '@hooks';
import {useSelectedToken, useWallets} from '@providers';
import {TransferType} from '@starkgate/shared';
import {useLogger} from '@starkware-webapps/ui';
import {promiseHandler} from '@starkware-webapps/utils';
import {isEth} from '@utils';

export const useTransferToL2 = () => {
  const logger = useLogger('useTransferToL2');
  const [trackInitiated, trackSuccess, trackError, trackReject] = useTransferToL2Tracking();
  const {deposit, depositEth} = useBridgeContractAPI();
  const {allowance, approve} = useTokenContractAPI();
  const {ethereumAccount, starknetAccount, ethereumWalletName} = useWallets();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL2Steps);
  const selectedToken = useSelectedToken();
  const progressOptions = useTransferProgress();
  const isMaxTotalBalanceExceeded = useIsMaxTotalBalanceExceeded();
  const {APPROVE_AMOUNT} = useConstants();

  return useCallback(
    async amount => {
      const {symbol, name, bridgeAddress} = selectedToken;

      const sendDeposit = async () => {
        trackInitiated({
          fromAddress: ethereumAccount,
          toAddress: starknetAccount,
          amount,
          symbol
        });
        const depositHandler = isEth(symbol) ? depositEth : deposit;
        const [tx, error] = await promiseHandler(
          depositHandler({
            recipient: starknetAccount,
            amount
          })
        );
        if (!error) {
          logger.log('Tx signed', {transactionHash: tx.hash});
          handleProgress(
            progressOptions.deposit(amount, symbol, stepOf(TransferStep.DEPOSIT, TransferToL2Steps))
          );
          return tx;
        }
        throw error;
      };

      const handleDepositSuccess = ({transactionHash}) => {
        trackSuccess({transactionHash});
        const transferData = {
          type: TransferType.DEPOSIT,
          sender: ethereumAccount,
          recipient: starknetAccount,
          l1TxHash: transactionHash,
          l1TxTimestamp: new Date().getTime(),
          name,
          symbol,
          amount
        };
        handleData(transferData);
      };

      try {
        logger.log('TransferToL2 called');
        const {exceeded, currentTotalBalance, maxTotalBalance} = await isMaxTotalBalanceExceeded(
          amount
        );
        if (exceeded) {
          const error = progressOptions.error(TransferError.MAX_TOTAL_BALANCE_ERROR, null, {
            maxTotalBalance,
            symbol,
            currentTotalBalance,
            amount
          });
          logger.error(`Prevented ${symbol} deposit due to maxTotalBalance exceeded`);
          trackReject({error});
          handleError(error);
        } else {
          if (!isEth(symbol)) {
            logger.log('Token needs approval');
            handleProgress(
              progressOptions.approval(symbol, stepOf(TransferStep.APPROVE, TransferToL2Steps))
            );
            const allow = await allowance({
              owner: ethereumAccount,
              spender: bridgeAddress
            });
            logger.log('Current allow value', {allow});
            if (Number(allow) < Number(amount)) {
              logger.log('Allow value is smaller then amount, sending approve tx...', {amount});
              const tx = await approve({
                spender: bridgeAddress,
                value: APPROVE_AMOUNT
              });
              const receipt = await tx.wait();
              logger.log('Approve tx mined', {receipt});
            }
          }
          handleProgress(
            progressOptions.waitForConfirm(
              ethereumWalletName,
              stepOf(TransferStep.CONFIRM_TX, TransferToL2Steps)
            )
          );
          logger.log('Calling deposit');
          const tx = await sendDeposit();
          const receipt = await tx.wait();
          logger.log('Deposit tx mined', {receipt});
          handleDepositSuccess(receipt);
        }
      } catch (ex) {
        trackError({error: ex});
        logger.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      selectedToken,
      deposit,
      depositEth,
      allowance,
      approve,
      ethereumAccount,
      starknetAccount,
      ethereumWalletName,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      isMaxTotalBalanceExceeded
    ]
  );
};
