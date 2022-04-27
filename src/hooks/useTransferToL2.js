import {useCallback} from 'react';

import {deposit, depositEth} from '../api/bridge';
import {allowance, approve, balanceOf, ethBalanceOf} from '../api/erc20';
import {ActionType, stepOf, TransferError, TransferStep, TransferToL2Steps} from '../enums';
import {starknet} from '../libs';
import {useDepositListener} from '../providers/EventManagerProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';
import {useTokenBridgeContract, useTokenContract} from './useContract';
import {useLogger} from './useLogger';
import {useMaxTotalBalance} from './useTokenConstant';
import {useTransferToL2Tracking} from './useTracking';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL2 = () => {
  const logger = useLogger('useTransferToL2');
  const [trackInitiated, trackSuccess, trackError, trackReject] = useTransferToL2Tracking();
  const {account: l1Account, chainId: l1ChainId, config: l1Config} = useL1Wallet();
  const {account: l2Account} = useL2Wallet();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL2Steps);
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const progressOptions = useTransferProgress();
  const {addListener, removeListener} = useDepositListener();
  const maxTotalBalance = useMaxTotalBalance();

  return useCallback(
    async amount => {
      const {symbol, decimals, name, tokenAddress, bridgeAddress} = selectedToken;
      const tokenContract = getTokenContract(tokenAddress);
      const bridgeContract = getTokenBridgeContract(bridgeAddress);
      const isEthToken = utils.token.isEth(symbol);
      const tokenBridgeAddress = bridgeAddress[l1ChainId];

      const readAllowance = () => {
        return allowance({
          owner: l1Account,
          spender: tokenBridgeAddress,
          contract: tokenContract,
          decimals
        });
      };

      const sendApproval = async () => {
        return approve({
          spender: tokenBridgeAddress,
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
        const depositHandler = isEthToken ? depositEth : deposit;
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

      const onDeposit = async (error, event) => {
        if (!error) {
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
        }
      };

      const isMaxBalanceExceeded = async () => {
        const tokenBridgeBalance = await (isEthToken
          ? ethBalanceOf(tokenBridgeAddress)
          : balanceOf({
              account: tokenBridgeAddress,
              decimals,
              contract: tokenContract
            }));
        return maxTotalBalance < tokenBridgeBalance + Number(amount);
      };

      try {
        logger.log('TransferToL2 called');
        if (await isMaxBalanceExceeded()) {
          trackReject(progressOptions.error(TransferError.MAX_TOTAL_BALANCE_ERROR));
          logger.error(`Prevented ${symbol} deposit due to max balance exceeded`);
          handleError(progressOptions.error(TransferError.MAX_TOTAL_BALANCE_ERROR));
          return;
        }
        if (!isEthToken) {
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
        addListener(onDeposit);
        logger.log('Calling deposit');
        await sendDeposit();
      } catch (ex) {
        removeListener();
        trackError(ex);
        logger.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      selectedToken,
      addListener,
      removeListener,
      l1ChainId,
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
      maxTotalBalance
    ]
  );
};
