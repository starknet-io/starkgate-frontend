import {useCallback} from 'react';

import {track, TrackEvent} from '../analytics';
import {deposit, depositEth} from '../api/bridge';
import {allowance, approve, balanceOf, ethBalanceOf} from '../api/erc20';
import {
  ActionType,
  stepOf,
  TransactionHashPrefix,
  TransferError,
  TransferStep,
  TransferToL2Steps
} from '../enums';
import {starknet} from '../libs';
import {useLogMessageToL2Listener} from '../providers/EventManagerProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';
import {useTokenBridgeContract, useTokenContract} from './useContract';
import {useLogger} from './useLogger';
import {useMaxTotalBalance} from './useTokenConstant';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL2 = () => {
  const logger = useLogger('useTransferToL2');
  const {account: l1Account, chainId: l1ChainId, config: l1Config} = useL1Wallet();
  const {account: l2Account, chainId: l2ChainId} = useL2Wallet();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL2Steps);
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const progressOptions = useTransferProgress();
  const addLogMessageToL2Listener = useLogMessageToL2Listener();
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
        track(TrackEvent.TRANSFER.TRANSFER_TO_L2_INITIATED, {
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
        } else {
          track(TrackEvent.TRANSFER.TRANSFER_TO_L2_REJECT, error);
          logger.error(error.message);
          handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, error));
        }
      };

      const onLogMessageToL2 = (error, event) => {
        if (!error) {
          logger.log('Done', event.transactionHash);
          handleData({
            type: ActionType.TRANSFER_TO_L2,
            sender: l1Account,
            recipient: l2Account,
            name,
            symbol,
            amount,
            ...extractTransactionsHashFromEvent(event)
          });
        } else {
          track(TrackEvent.TRANSFER.TRANSFER_TO_L2_ERROR, error);
          logger.error(error.message);
          handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, error));
        }
      };

      const extractTransactionsHashFromEvent = event => {
        const {to_address, from_address, selector, payload, nonce} = event.returnValues;
        const l1hash = event.transactionHash;
        const l2hash = utils.blockchain.starknet.getTransactionHash(
          TransactionHashPrefix.L1_HANDLER,
          from_address,
          to_address,
          selector,
          payload,
          l2ChainId,
          nonce
        );
        track(TrackEvent.TRANSFER.TRANSFER_TO_L2_SUCCESS, {l1hash, l2hash});
        return {
          l1hash,
          l2hash
        };
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
          track(
            TrackEvent.TRANSFER.TRANSFER_TO_L2_REJECT,
            progressOptions.error(TransferError.MAX_TOTAL_BALANCE_ERROR)
          );
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
        addLogMessageToL2Listener(onLogMessageToL2);
        logger.log('Calling deposit');
        await sendDeposit();
      } catch (ex) {
        track(TrackEvent.TRANSFER.TRANSFER_TO_L2_ERROR, ex);
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      selectedToken,
      addLogMessageToL2Listener,
      l1ChainId,
      l2ChainId,
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
