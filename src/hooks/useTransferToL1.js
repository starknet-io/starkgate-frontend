import {useCallback} from 'react';

import {initiateWithdraw, withdraw} from '../api/bridge';
import {
  ActionType,
  CompleteTransferToL1Steps,
  EventName,
  stepOf,
  TransactionStatus,
  TransferError,
  TransferStep,
  TransferToL1Steps
} from '../enums';
import {useL1Token} from '../providers/TokensProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import {waitForTransaction} from '../utils';
import {useL1TokenBridgeContract, useL2TokenContract, useTokenBridgeContract} from './useContract';
import {useLogger} from './useLogger';
import {useCompleteTransferToL1Tracking, useTransferToL1Tracking} from './useTracking';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL1 = () => {
  const logger = useLogger('useTransferToL1');
  const [trackInitiated, trackSuccess, trackError] = useTransferToL1Tracking();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const getTokenBridgeContract = useTokenBridgeContract();
  const getL2TokenContract = useL2TokenContract();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async amount => {
      const {decimals, bridgeAddress, tokenAddress, name, symbol} = selectedToken;

      const sendInitiateWithdraw = () => {
        trackInitiated({
          from_address: l2Account,
          to_address: l1Account,
          amount,
          symbol
        });

        const bridgeContract = getTokenBridgeContract(bridgeAddress);
        const tokenContract = getL2TokenContract(tokenAddress);

        return initiateWithdraw({
          recipient: l1Account,
          bridge: bridgeContract,
          token: tokenContract,
          symbol,
          amount,
          decimals
        });
      };

      try {
        logger.log('TransferToL1 called');
        handleProgress(
          progressOptions.waitForConfirm(
            l2Config.name,
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
          sender: l2Account,
          recipient: l1Account,
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
  const {handleProgress, handleData, handleError} = useTransfer(CompleteTransferToL1Steps);
  const progressOptions = useTransferProgress();
  const getL1Token = useL1Token();
  const getL1TokenBridgeContract = useL1TokenBridgeContract();
  const [trackInitiated, trackSuccess, trackError] = useCompleteTransferToL1Tracking();

  return useCallback(
    async transfer => {
      const {symbol, amount, l2hash} = transfer;
      const {bridgeAddress, decimals} = getL1Token(symbol);
      const bridgeContract = getL1TokenBridgeContract(bridgeAddress);

      const sendWithdrawal = () => {
        trackInitiated({
          to_address: l1Account,
          l2hash,
          amount,
          symbol
        });
        return withdraw({
          recipient: l1Account,
          contract: bridgeContract,
          emitter: onTransactionHash,
          amount,
          decimals
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
            l1Config.name,
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
