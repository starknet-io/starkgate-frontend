import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import constants from '../../config/constants';
import {isCompleted, isConsumed} from '../../enums';
import {useLogger} from '../../hooks';
import {starknet} from '../../libs';
import utils from '../../utils';
import {useBlockHash} from '../BlockHashProvider';
import {useTokens} from '../TokensProvider';
import {TransfersContext} from './transfers-context';
import {actions, initialState, reducer} from './transfers-reducer';

const {LOCAL_STORAGE_TRANSFERS_KEY} = constants;

export const TransfersProvider = ({children}) => {
  const logger = useLogger(TransfersProvider.displayName);
  const [transfers, dispatch] = useReducer(reducer, initialState);
  const blockHash = useBlockHash();
  const {updateTokenBalance} = useTokens();

  useEffect(() => {
    const storedTransfers = utils.storage.getItem(LOCAL_STORAGE_TRANSFERS_KEY);
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
          const {tx_status} = await starknet.defaultProvider.getTransactionStatus(transfer.l2hash);
          if (transfer.status !== tx_status) {
            updated = true;
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
      let updated = false;
      const newTransfers = [];
      for (const transfer of transfers) {
        const newTransfer = await checkTransaction(transfer);
        newTransfers.push(newTransfer);
      }
      if (updated && newTransfers.length) {
        logger.log('Transfers updated', {newTransfers});
        setTransfers(newTransfers);
        utils.storage.setItem(LOCAL_STORAGE_TRANSFERS_KEY, newTransfers);
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
