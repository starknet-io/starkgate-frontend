import {ActionType, EventName} from '@starkware-industries/starkware-commons-js-enums';
import {starknet} from '@starkware-industries/starkware-commons-js-libs';
import {useCallback} from 'react';

import {stepOf, TransferError, TransferStep, TransferToL2Steps} from '../enums';
import {useL2Token} from '../providers/TokensProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import {addToken, isEth, promiseHandler} from '../utils';
import {useBridgeContractAPI} from './useBridgeContractAPI';
import {useIsMaxTotalBalanceExceeded} from './useIsMaxTotalBalanceExceeded';
import {useLogger} from './useLogger';
import {useTokenContractAPI} from './useTokenContractAPI';
import {useTransferToL2Tracking} from './useTracking';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

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

      const sendDeposit = () => {
        trackInitiated({
          from_address: accountL1,
          to_address: accountL2,
          amount,
          symbol
        });
        const depositHandler = isEth(symbol) ? depositEth : deposit;
        return depositHandler({
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
        trackSuccess(event.transactionHash);
        handleData({
          type: ActionType.TRANSFER_TO_L2,
          sender: accountL1,
          recipient: accountL2,
          l1hash: event.transactionHash,
          name,
          symbol,
          amount,
          event
        });
      };

      const maybeAddToken = async () => {
        const [, error] = await promiseHandler(addToken(tokenAddressL2));
        if (error) {
          logger.warn(error.message);
        }
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
          trackReject(error);
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
                value: starknet.constants.MASK_250
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
          await maybeAddToken(tokenAddressL2);
        }
      } catch (ex) {
        trackError(ex);
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
