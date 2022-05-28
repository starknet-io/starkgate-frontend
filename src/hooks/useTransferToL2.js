import {useCallback} from 'react';

import {deposit, depositEth} from '../api/bridge';
import {allowance, approve} from '../api/erc20';
import {
  ActionType,
  EventName,
  stepOf,
  TransferError,
  TransferStep,
  TransferToL2Steps
} from '../enums';
import {starknet} from '../libs';
import {useL2Token} from '../providers/TokensProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import {addToken, isEth, promiseHandler} from '../utils';
import {useTokenBridgeContract, useTokenContract} from './useContract';
import {useIsMaxTotalBalanceExceeded} from './useIsMaxTotalBalanceExceeded';
import {useLogger} from './useLogger';
import {useTransferToL2Tracking} from './useTracking';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL2 = () => {
  const logger = useLogger('useTransferToL2');
  const [trackInitiated, trackSuccess, trackError, trackReject] = useTransferToL2Tracking();
  const {account: l1Account, config: l1Config} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL2Steps);
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const progressOptions = useTransferProgress();
  const getL2Token = useL2Token();
  const isMaxTotalBalanceExceeded = useIsMaxTotalBalanceExceeded();

  return useCallback(
    async amount => {
      const {symbol, decimals, name, tokenAddress, bridgeAddress} = selectedToken;
      const tokenContract = getTokenContract(tokenAddress);
      const bridgeContract = getTokenBridgeContract(bridgeAddress);
      const l2TokenAddress = getL2Token(symbol)?.tokenAddress;

      const readAllowance = () => {
        return allowance({
          owner: l1Account,
          spender: bridgeAddress,
          contract: tokenContract,
          decimals
        });
      };

      const sendApproval = async () => {
        return approve({
          spender: bridgeAddress,
          value: starknet.constants.MASK_250,
          contract: tokenContract,
          options: {from: l1Account}
        });
      };

      const sendDeposit = () => {
        trackInitiated({
          from_address: l1Account,
          to_address: l2Account,
          amount,
          symbol
        });
        const depositHandler = isEth(symbol) ? depositEth : deposit;
        return depositHandler({
          recipient: l2Account,
          contract: bridgeContract,
          options: {from: l1Account},
          emitter: onTransactionHash,
          amount,
          decimals
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
          sender: l1Account,
          recipient: l2Account,
          l1hash: event.transactionHash,
          name,
          symbol,
          amount,
          event
        });
      };

      const maybeAddToken = async () => {
        const [, error] = await promiseHandler(addToken(l2TokenAddress));
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
            const allow = await readAllowance();
            logger.log('Current allow value', {allow});
            if (allow < amount) {
              logger.log('Allow value is smaller then amount, sending approve tx...', {amount});
              await sendApproval();
            }
          }
          handleProgress(
            progressOptions.waitForConfirm(
              l1Config.name,
              stepOf(TransferStep.CONFIRM_TX, TransferToL2Steps)
            )
          );
          logger.log('Calling deposit');
          const receipt = await sendDeposit();
          onDeposit(receipt.events[EventName.L1.LOG_DEPOSIT]);
          await maybeAddToken(l2TokenAddress);
        }
      } catch (ex) {
        trackError(ex);
        logger.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      selectedToken,
      l1Account,
      l2Account,
      l1Config,
      getTokenBridgeContract,
      getTokenContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      isMaxTotalBalanceExceeded
    ]
  );
};
