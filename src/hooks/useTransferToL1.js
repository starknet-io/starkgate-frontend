import axios from 'axios';
import {useCallback} from 'react';

import {initiateWithdraw, initiateWormhole, withdraw, requestMint} from '../api/bridge';
import {approveL2, allowanceL2} from '../api/erc20';
import {
  ActionType,
  CompleteTransferToL1Steps,
  stepOf,
  TransactionStatus,
  TransferError,
  TransferStep,
  TransferToL1Steps,
  FastTransferToL1Steps
} from '../enums';
import {useWithdrawalListener} from '../providers/EventManagerProvider';
import {useL1Token} from '../providers/TokensProvider';
import {useSelectedToken} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import {waitForTransaction} from '../utils';
import {
  useL1TokenBridgeContract,
  useTokenBridgeContract,
  useTokenContract,
  useL2TokenGatewayContract,
  useOracleAuthContract
} from './useContract';
import {useLogger} from './useLogger';
import {
  useCompleteTransferToL1Tracking,
  useTransferToL1Tracking,
  useFastTransferToL1Tracking
} from './useTracking';
import {useTransfer} from './useTransfer';
import {useTransferProgress} from './useTransferProgress';

export const useTransferToL1 = () => {
  const logger = useLogger('useTransferToL1');
  const [trackInitiated, trackSuccess, trackError] = useTransferToL1Tracking();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const getTokenBridgeContract = useTokenBridgeContract();
  const {handleProgress, handleData, handleError} = useTransfer(TransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async amount => {
      const {decimals, bridgeAddress, name, symbol} = selectedToken;

      const sendInitiateWithdraw = () => {
        trackInitiated({
          from_address: l2Account,
          to_address: l1Account,
          amount,
          symbol
        });
        const bridgeContract = getTokenBridgeContract(bridgeAddress);
        return initiateWithdraw({
          recipient: l1Account,
          contract: bridgeContract,
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

export const useFastTransferToL1 = () => {
  const logger = useLogger('useFastTransferToL1');
  const [trackInitiated, trackSuccess, trackError] = useFastTransferToL1Tracking();
  const {account: l1Account} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const selectedToken = useSelectedToken();
  const getTokenContract = useTokenContract();
  const getTokenGatewayContract = useL2TokenGatewayContract();
  const getOracleAuthContract = useOracleAuthContract();
  const {handleProgress, handleData, handleError} = useTransfer(FastTransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async amount => {
      const {decimals, tokenAddress, gatewayAddress, name, symbol} = selectedToken;
      const tokenContract = getTokenContract(tokenAddress);

      const readAllowance = () => {
        return allowanceL2({
          owner: l2Account,
          spender: gatewayAddress,
          decimals,
          contract: tokenContract
        });
      };

      const sendApproval = async () => {
        return approveL2({
          spender: gatewayAddress,
          amount: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          contract: tokenContract
        });
      };

      const sendInitiateWormhole = () => {
        trackInitiated({
          from_address: l2Account,
          to_address: l1Account,
          amount,
          symbol
        });
        const gatewayContract = getTokenGatewayContract(gatewayAddress);
        return initiateWormhole({
          targetDomain: `0x${Buffer.from('GOERLI-MASTER-1', 'utf8').toString('hex')}`,
          receiver: l1Account,
          operator: l1Account,
          amount,
          decimals,
          contract: gatewayContract
        });
      };

      const fetchAttestations = async txHash => {
        const response = await axios.get(ORACLE_API_URL, {
          params: {
            type: 'wormhole',
            index: txHash
          }
        });

        const results = response.data || [];

        const signatures = `0x${results
          .map(oracle => oracle.signatures.ethereum.signature)
          .join('')}`;

        let wormholeGUID = {};
        if (results.length > 0) {
          const wormholeData = results[0].data.event.match(/.{64}/g).map(hex => `0x${hex}`);
          wormholeGUID = decodeWormholeData(wormholeData);
        }

        const oracleAuthContract = getOracleAuthContract(
          '0x455f17Bdd98c19e3417129e7a821605661623aD7'
        );
        requestMint({
          sourceDomain: wormholeGUID.sourceDomain,
          targetDomain: wormholeGUID.targetDomain,
          receiver: wormholeGUID.receiver,
          operator: wormholeGUID.operator,
          amount: wormholeGUID.amount,
          nonce: wormholeGUID.nonce,
          timestamp: wormholeGUID.timestamp,
          signatures,
          contract: oracleAuthContract,
          options: {from: l1Account},
          emitter: onTransactionHash
        });
      };

      const onTransactionHash = (error, transactionHash) => {
        if (!error) {
          logger.log('Tx signed', {transactionHash});
          handleProgress(
            progressOptions.requestMint(
              amount,
              symbol,
              stepOf(TransferStep.FAST_WITHDRAW, FastTransferToL1Steps)
            )
          );
        }
      };

      try {
        logger.log('Wormhole called');
        handleProgress(
          progressOptions.waitForConfirm(
            l2Config.name,
            stepOf(TransferStep.CONFIRM_TX, FastTransferToL1Steps)
          )
        );
        logger.log('Token needs approval');
        handleProgress(
          progressOptions.approval(symbol, stepOf(TransferStep.APPROVE, FastTransferToL1Steps))
        );
        const allow = await readAllowance();
        logger.log('Current allow value', {allow});
        if (allow < amount) {
          logger.log('Allow value is smaller then amount, sending approve tx...', {amount});
          await sendApproval();
        }
        logger.log('Calling initiate wormhole');
        const {transaction_hash: l2hash} = await sendInitiateWormhole();
        logger.log('Tx hash received', {l2hash});
        handleProgress(
          progressOptions.initiateWormhole(
            amount,
            symbol,
            stepOf(TransferStep.INITIATE_FAST_WITHDRAW, FastTransferToL1Steps)
          )
        );
        logger.log('Waiting for tx to be received on L2');
        await waitForTransaction(l2hash, TransactionStatus.ACCEPTED_ON_L2);
        logger.log('Done', {l2hash});
        await fetchAttestations(l2hash);
        trackSuccess(l2hash);
        handleData({
          type: ActionType.WORMHOLE_TO_L1,
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
      getTokenGatewayContract,
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
  const {addListener, removeListener} = useWithdrawalListener();
  const [trackInitiated, trackSuccess, trackError] = useCompleteTransferToL1Tracking();

  return useCallback(
    async transfer => {
      const {symbol, amount, l2hash} = transfer;

      const sendWithdrawal = () => {
        trackInitiated({
          to_address: l1Account,
          l2hash,
          amount,
          symbol
        });
        const {bridgeAddress, decimals} = getL1Token(symbol);
        const tokenBridgeContract = getL1TokenBridgeContract(bridgeAddress);
        return withdraw({
          recipient: l1Account,
          contract: tokenBridgeContract,
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

      const onWithdrawal = (error, event) => {
        if (!error) {
          logger.log('Withdrawal event dispatched', event);
          const {transactionHash: l1hash} = event;
          trackSuccess(l1hash);
          handleData({...transfer, l1hash});
        }
      };

      try {
        logger.log('CompleteTransferToL1 called');
        handleProgress(
          progressOptions.waitForConfirm(
            l1Config.name,
            stepOf(TransferStep.CONFIRM_TX, CompleteTransferToL1Steps)
          )
        );
        addListener(onWithdrawal);
        logger.log('Calling withdraw');
        await sendWithdrawal();
      } catch (ex) {
        removeListener();
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
      progressOptions,
      addListener,
      removeListener
    ]
  );
};

const ORACLE_API_URL = 'http://23.242.90.215:8080';

function decodeWormholeData(wormholeData) {
  const wormholeGUID = {
    sourceDomain: wormholeData[0],
    targetDomain: wormholeData[1],
    receiver: wormholeData[2],
    operator: wormholeData[3],
    amount: wormholeData[4],
    nonce: wormholeData[5],
    timestamp: wormholeData[6]
  };
  return wormholeGUID;
}
