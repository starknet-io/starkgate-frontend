import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {isCompleted, isConsumed, TransactionHashPrefix} from '../../enums';
import {useEnvs, useLogger} from '../../hooks';
import {getStarknet} from '../../libs';
import utils from '../../utils';
import {useBlockHash} from '../BlockHashProvider';
import {useDepositMessageToL2Event} from '../EventManagerProvider';
import {useTokens} from '../TokensProvider';
import {useAccountHash, useL2Wallet} from '../WalletsProvider';
import {TransfersLogContext} from './transfers-log-context';
import {actions, initialState, reducer} from './transfers-log-reducer';

export const TransfersLogProvider = ({children}) => {
  const [transfers, dispatch] = useReducer(reducer, initialState);
  const {localStorageTransfersLogKey} = useEnvs();
  const logger = useLogger(TransfersLogProvider.displayName);
  const blockHash = useBlockHash();
  const {updateTokenBalance} = useTokens();
  const {chainId: l2ChainId} = useL2Wallet();
  const getDepositMessageToL2Event = useDepositMessageToL2Event();
  const accountHash = useAccountHash();

  useEffect(() => {
    const storedTransfers = getTransfersFromStorage();
    setTransfers(storedTransfers);
  }, []);

  useDeepCompareEffect(() => {
    const updateTransfers = async () => {
      if (!blockHash) {
        return;
      }
      const newTransfers = [];
      for (const transfer of transfers) {
        const newTransfer = await (transfer.l2hash
          ? checkTransaction(transfer)
          : calcL2TransactionHash(transfer));
        newTransfers.push(newTransfer);
      }
      if (newTransfers.length) {
        logger.log('Transfers updated', {newTransfers});
        setTransfers(newTransfers);
        saveTransfersToStorage(newTransfers);
      }
    };
    updateTransfers();
  }, [blockHash, transfers]);

  const checkTransaction = async transfer => {
    if (isCompleted(transfer.status) || transfer.lastChecked === blockHash) {
      return transfer;
    }
    try {
      logger.log(`Checking tx status ${transfer.l2hash}`);
      const {tx_status} = await getStarknet().provider.getTransactionStatus(transfer.l2hash);
      if (transfer.status !== tx_status) {
        logger.log(`Status changed from ${transfer.status}->${tx_status}`);
        if (isConsumed(tx_status)) {
          updateTokenBalance(transfer.symbol);
        }
      } else {
        logger.log(`Status is still ${tx_status}`);
      }
      return {
        ...transfer,
        status: tx_status,
        lastChecked: blockHash
      };
    } catch (error) {
      logger.error(`Failed to check transaction status: ${transfer.l2hash}`);
    }
    return transfer;
  };

  const calcL2TransactionHash = async transfer => {
    const l2MessageEvent = await getDepositMessageToL2Event(transfer.event);
    if (l2MessageEvent) {
      const {to_address, from_address, selector, payload, nonce} = l2MessageEvent.returnValues;
      delete transfer.event;
      return {
        ...transfer,
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
    }
    return transfer;
  };

  const getTransfersFromStorage = () => {
    const storedTransfers = utils.storage.getItem(localStorageTransfersLogKey) || {};
    return storedTransfers[accountHash] || [];
  };

  const saveTransfersToStorage = transfers => {
    const storedTransfers = utils.storage.getItem(localStorageTransfersLogKey) || {};
    const updatedTransfers = Object.assign(storedTransfers, {[accountHash]: transfers});
    utils.storage.setItem(localStorageTransfersLogKey, updatedTransfers);
  };

  const updateTransfer = transfer => {
    dispatch({
      type: actions.UPDATE_TRANSFER,
      transfer
    });
  };

  const addTransfer = newTransfer => {
    dispatch({
      type: actions.ADD_TRANSFER,
      newTransfer
    });
  };

  const setTransfers = transfers => {
    dispatch({
      type: actions.SET_TRANSFERS,
      transfers
    });
  };

  const context = {
    transfers,
    addTransfer,
    updateTransfer
  };

  return <TransfersLogContext.Provider value={context}>{children}</TransfersLogContext.Provider>;
};

TransfersLogProvider.displayName = 'TransfersLogProvider';

TransfersLogProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
