import {useCallback} from 'react';

import {deposit, depositEth} from '../api/bridge';
import {allowance, approve} from '../api/erc20';
import {ActionType, TransactionHashPrefix} from '../enums';
import {starknet} from '../libs';
import {useLogMessageToL2Listener} from '../providers/EventManagerProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';
import {useTokenBridgeContract, useTokenContract} from './useContract';
import {useLogger} from './useLogger';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL2 = () => {
  const logger = useLogger('useTransferToL2');
  const {account: l1Account, chainId: l1ChainId, config: l1Config} = useL1Wallet();
  const {account: l2Account, chainId: l2ChainId} = useL2Wallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenBridgeContract = useTokenBridgeContract();
  const progressOptions = useTransferProgress();
  const addLogMessageToL2Listener = useLogMessageToL2Listener();

  return useCallback(
    async amount => {
      const {symbol, decimals, name, tokenAddress, bridgeAddress} = selectedToken;
      const isEthToken = utils.token.isEth(symbol);
      const tokenContract = getTokenContract(tokenAddress);
      const bridgeContract = getTokenBridgeContract(bridgeAddress);

      const readAllowance = () => {
        return allowance({
          owner: l1Account,
          spender: bridgeAddress[l1ChainId],
          decimals,
          contract: tokenContract
        });
      };

      const sendApproval = () => {
        return approve({
          spender: bridgeAddress[l1ChainId],
          value: starknet.constants.MASK_250,
          contract: tokenContract,
          options: {from: l1Account}
        });
      };

      const sendDeposit = () => {
        const depositHandler = isEthToken ? depositEth : deposit;
        return depositHandler({
          recipient: l2Account,
          amount,
          decimals,
          contract: bridgeContract,
          options: {from: l1Account},
          emitter: onTransactionHash
        });
      };

      const onTransactionHash = (error, transactionHash) => {
        if (error) {
          logger.error(error.message);
          handleError(progressOptions.error(error));
          return;
        }
        logger.log('Tx signed', {transactionHash});
        handleProgress(progressOptions.deposit(amount, symbol));
      };

      const onLogMessageToL2 = (error, event) => {
        if (error) {
          logger.error(error.message);
          handleError(progressOptions.error(error));
          return;
        }
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
      };

      const extractTransactionsHashFromEvent = event => {
        const {to_address, from_address, selector, payload, nonce} = event.returnValues;
        return {
          l1hash: event.transactionHash,
          l2hash: utils.blockchain.starknet.getTransactionHash(
            TransactionHashPrefix.L1_HANDLER,
            from_address,
            to_address,
            selector,
            payload,
            l2ChainId,
            nonce
          )
        };
      };

      try {
        logger.log('TransferToL2 called');
        if (!isEthToken) {
          logger.log('Token needs approval');
          handleProgress(progressOptions.approval(symbol));
          const allow = await readAllowance();
          logger.log('Current allow value', {allow});
          if (allow < amount) {
            logger.log('Allow value is smaller then amount, sending approve tx...', {amount});
            await sendApproval();
          }
        }
        handleProgress(progressOptions.waitForConfirm(l1Config.name));
        addLogMessageToL2Listener(onLogMessageToL2);
        logger.log('Calling deposit');
        sendDeposit();
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      selectedToken,
      addLogMessageToL2Listener,
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
      progressOptions
    ]
  );
};
