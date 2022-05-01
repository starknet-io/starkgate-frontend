import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import envs from '../../config/envs';
import {isCompleted, isConsumed} from '../../enums';
import {useLogger} from '../../hooks';
import {getStarknet} from '../../libs';
import utils from '../../utils';
import {useBlockHash} from '../BlockHashProvider';
import {useTokens} from '../TokensProvider';
import {TransfersLogContext} from './transfers-log-context';
import {actions, initialState, reducer} from './transfers-log-reducer';

const {localStorageTransfersLogKey} = envs;

export const TransfersLogProvider = ({children}) => {
  const logger = useLogger(TransfersLogProvider.displayName);
  const [transfers, dispatch] = useReducer(reducer, initialState);
  const blockHash = useBlockHash();
  const {updateTokenBalance} = useTokens();

  useEffect(() => {
    const storedTransfers = getTransfersFromStorage();
    if (Array.isArray(storedTransfers)) {
      setTransfers(storedTransfers);
    }
  }, []);

  useDeepCompareEffect(() => {
    const updateTransfers = async () => {
      if (!blockHash) {
        return;
      }
      const checkTransaction = async transfer => {
        if (isCompleted(transfer.status) || transfer.lastChecked === blockHash) {
          return transfer;
        }
        try {
          logger.log(`Checking tx status ${transfer.l2hash}`);
          const {tx_status} = await getStarknet().provider.getTransactionStatus(transfer.l2hash);
          if (transfer.status !== tx_status) {
            logger.log(`Status changed from ${transfer.status}->${tx_status}`);
          } else {
            logger.log(`Status is still ${tx_status}`);
          }
          if (isConsumed(tx_status)) {
            updateTokenBalance(transfer.symbol);
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

      const newTransfers = [];
      for (const transfer of transfers) {
        const newTransfer = await checkTransaction(transfer);
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

  const getTransfersFromStorage = () => {
    return utils.storage.getItem(localStorageTransfersLogKey);
  };

  const saveTransfersToStorage = transfers => {
    utils.storage.setItem(localStorageTransfersLogKey, transfers);
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
