import {useCallback} from 'react';

import {initiateWithdraw, withdraw} from '../api/bridge';
import {useSelectedToken} from '../components/Features/Transfer/Transfer.hooks';
import {ActionType, TransactionStatus} from '../enums';
import {useL1Token} from '../providers/TokensProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';
import {useL1TokenBridgeContract, useTokenBridgeContract} from './useContract';
import {useLogger} from './useLogger';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';
import {useLogWithdrawalListener} from '../providers/EventManagerProvider';

export const useTransferToL1 = () => {
  const logger = useLogger('useTransferToL1');
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const getTokenBridgeContract = useTokenBridgeContract();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();


  return useCallback(
    async amount => {
      const {decimals, bridgeAddress, name, symbol} = selectedToken;

      const sendInitiateWithdraw = async () => {
        const bridgeContract = getTokenBridgeContract(bridgeAddress);
        return await initiateWithdraw({
          recipient: l1Account,
          amount,
          decimals,
          contract: bridgeContract
        });
      };

      try {
        logger.log('TransferToL1 called');
        handleProgress(progressOptions.waitForConfirm(l2Config.name));
        logger.log('Calling initiate withdraw');
        const {transaction_hash} = await sendInitiateWithdraw();
        logger.log('Tx hash received', {transaction_hash});
        handleProgress(progressOptions.initiateWithdraw(amount, symbol));
        logger.log('Waiting for tx to be received on L2');
        await utils.blockchain.starknet.waitForTransaction(
          transaction_hash,
          TransactionStatus.RECEIVED
        );
        logger.log('Done', {transaction_hash});
        handleData({
          type: ActionType.TRANSFER_TO_L1,
          sender: l2Account,
          recipient: l1Account,
          name,
          symbol,
          amount,
          l2hash: transaction_hash
        });
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
      }
    },
    [
      l1Account,
      getTokenBridgeContract,
      handleData,
      handleError,
      handleProgress,
      logger,
      progressOptions,
      selectedToken,
      l2Account,
      l2Config
    ]
  );
};

export const useCompleteTransferToL1 = () => {
  const logger = useLogger('useCompleteTransferToL1');
  const {account: l1Account, config: l1Config} = useL1Wallet();
  const {handleProgress, handleData, handleError} = useTransfer();
  const progressOptions = useTransferProgress();
  const getL1Token = useL1Token();
  const getL1TokenBridgeContract = useL1TokenBridgeContract();
  const addLogWithdrawalListener = useLogWithdrawalListener();

  return useCallback(
    async transfer => {

      const sendWithdrawal = async () => {
        const {symbol, amount} = transfer;
        const {bridgeAddress, decimals} = getL1Token(symbol);
        const tokenBridgeContract = getL1TokenBridgeContract(bridgeAddress);
        return await withdraw({
          recipient: l1Account,
          amount,
          decimals,
          contract: tokenBridgeContract,
          emitter: (error) => {
            if (!error) {
              logger.log('Tx signed');
              handleProgress(progressOptions.withdraw(amount, symbol));
            }
          }
        });
      };

      const onLogWithdrawal = (error,event)=>{
        logger.log('Done', event.transactionHash);
        handleData({...transfer, l1hash: event.transactionHash});
      }

      try {
        logger.log('CompleteTransferToL1 called');
        handleProgress(progressOptions.waitForConfirm(l1Config.name));
        addLogWithdrawalListener(onLogWithdrawal)
        logger.log('Calling withdraw');
        await sendWithdrawal();
      } catch (ex) {
        logger.error(ex.message, {ex});
        handleError(progressOptions.error(ex));
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
