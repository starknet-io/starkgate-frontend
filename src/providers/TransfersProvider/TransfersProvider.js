import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import constants from '../../config/constants';
import {isCompleted} from '../../enums';
import {useLogger} from '../../hooks';
import {starknet} from '../../libs';
import {StorageManager} from '../../services';
import {useBlockHash} from '../BlockHashProvider';
import {TransfersContext} from './transfers-context';
import {actions, initialState, reducer} from './transfers-reducer';

const {LOCAL_STORAGE_TRANSFERS_KEY} = constants;

export const TransfersProvider = ({children}) => {
  const logger = useLogger(TransfersProvider.displayName);
  const [transfers, dispatch] = useReducer(reducer, initialState);
  const blockHash = useBlockHash();

  useEffect(() => {
    const storedTransfers = StorageManager.getItem(LOCAL_STORAGE_TRANSFERS_KEY);
    if (Array.isArray(storedTransfers)) {
      setTransfers(storedTransfers);
    }
  }, []);

  useDeepCompareEffect(() => {
    const updateTransfers = async () => {
      logger.log(`It's time to update transfers!`);
      if (!blockHash) {
        return;
      }
      const checkTransaction = async transfer => {
        if (isCompleted(transfer.status)) {
          return transfer;
        }
        if (transfer.lastChecked === blockHash) {
          return transfer;
        }
        try {
          logger.log(`Checking tx status ${transfer.l2hash}`);
          const newStatus = await starknet.defaultProvider.getTransactionStatus(transfer.l2hash);
          if (transfer.status !== newStatus.tx_status) {
            logger.log(
              !transfer.status
                ? `New status ${newStatus.tx_status}`
                : `Status changed from ${transfer.status}->${newStatus.tx_status}`
            );
          }
          return {
            ...transfer,
            status: newStatus.tx_status,
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
      logger.log(`Done update transfers`, {newTransfers});
      if (newTransfers.length) {
        setTransfers(newTransfers);
        StorageManager.setItem(LOCAL_STORAGE_TRANSFERS_KEY, newTransfers);
      }
    };
    updateTransfers();
  }, [blockHash, transfers]);

  const addTransfer = payload => {
    dispatch({
      type: actions.ADD_TRANSFER,
      payload
    });
  };

  const setTransfers = payload => {
    dispatch({
      type: actions.SET_TRANSFERS,
      payload
    });
  };

  const context = {
    transfers,
    addTransfer
  };

  return <TransfersContext.Provider value={context}>{children}</TransfersContext.Provider>;
};

TransfersProvider.displayName = 'TransfersProvider';

TransfersProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
