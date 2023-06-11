import {getStarknet} from 'get-starknet';
import {useCallback} from 'react';
import {constants} from 'starknet';

import {TransferError, TransferStep, TransferToL2Steps, stepOf} from '@enums';
import {
  useBridgeContractAPI,
  useIsMaxTotalBalanceExceeded,
  useTokenContractAPI,
  useTransfer,
  useTransferProgress,
  useTransferToL2Tracking
} from '@hooks';
import {useL1Wallet, useL2Token, useL2Wallet, useSelectedToken} from '@providers';
import {TransferType} from '@starkgate/shared';
import {EventName} from '@starkware-webapps/enums';
import {useLogger} from '@starkware-webapps/ui';
import {isEth} from '@utils';

export const useTransferToL2 = () => {
  const logger = useLogger('useTransferToL2');
  const [trackInitiated, trackSuccess, trackError, trackReject] = useTransferToL2Tracking();
  const {deposit, depositEth} = useBridgeContractAPI();
  const {allowance, approve} = useTokenContractAPI();
  const {account: accountL1, config: configL1} = useL1Wallet();
  const {account: accountL2} = useL2Wallet();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL2Steps);
  const selectedToken = useSelectedToken();
  const progressOptions = useTransferProgress();
  const getL2Token = useL2Token();
  const isMaxTotalBalanceExceeded = useIsMaxTotalBalanceExceeded();

  return useCallback(
    async amount => {
      const {symbol, name, bridgeAddress} = selectedToken;
      const tokenAddressL2 = getL2Token(symbol)?.tokenAddress;

      const sendDeposit = async () => {
        trackInitiated({
          fromAddress: accountL1,
          toAddress: accountL2,
          amount,
          symbol
        });
        const depositHandler = isEth(symbol) ? depositEth : deposit;
        return await depositHandler({
          recipient: accountL2,
          amount,
          emitter: onTransactionHash
        });
      };

      const onTransactionHash = (error, transactionHash) => {
        if (!error) {
          logger.log('Tx signed', {transactionHash});
          handleProgress(
            progressOptions.deposit(amount, symbol, stepOf(TransferStep.DEPOSIT, TransferToL2Steps))
          );
        }
      };

      const onDeposit = event => {
        logger.log('Deposit event dispatched', event);
        trackSuccess({hash: event.transactionHash});
        const transferData = {
          type: TransferType.DEPOSIT,
          sender: accountL1,
          recipient: accountL2,
          l1TxHash: event.transactionHash,
          l1TxTimestamp: new Date().getTime(),
          name,
          symbol,
          amount,
          event
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
              owner: accountL1,
              spender: bridgeAddress
            });
            logger.log('Current allow value', {allow});
            if (Number(allow) < Number(amount)) {
              logger.log('Allow value is smaller then amount, sending approve tx...', {amount});
              await approve({
                spender: bridgeAddress,
                value: constants.MASK_250
              });
            }
          }
          handleProgress(
            progressOptions.waitForConfirm(
              configL1.name,
              stepOf(TransferStep.CONFIRM_TX, TransferToL2Steps)
            )
          );
          logger.log('Calling deposit');
          const receipt = await sendDeposit();
          onDeposit(receipt.events[EventName.L1.LOG_DEPOSIT]);
          await getStarknet().request({
            type: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: tokenAddressL2
              }
            }
          });
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
      getL2Token,
      accountL1,
      accountL2,
      configL1,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      isMaxTotalBalanceExceeded
    ]
  );
};
