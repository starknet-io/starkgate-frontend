import {getStarknet} from '@argent/get-starknet';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {LOCAL_STORAGE_TXS_KEY} from '../../constants';
import {TransactionStatus} from '../../enums';
import {useLogger} from '../../hooks';
import {StorageManager} from '../../services';
import {useBlockHash} from '../BlockHashProvider';
import {TransactionsContext} from './transactions-context';
import {actions, initialState, reducer} from './transactions-reducer';

export const TransactionsProvider = ({children}) => {
  const logger = useLogger(TransactionsProvider.displayName);
  const [transactions, dispatch] = useReducer(reducer, initialState);
  const blockHash = useBlockHash();

  useEffect(() => {
    const storedTransactions = StorageManager.getItem(LOCAL_STORAGE_TXS_KEY);
    if (Array.isArray(storedTransactions)) {
      setTransactions(storedTransactions);
    }
  }, []);

  useDeepCompareEffect(() => {
    const updateTransactions = async () => {
      logger.log(`It's time to update transactions!`);
      if (!blockHash) {
        return;
      }
      const checkTransaction = async tx => {
        if ([TransactionStatus.REJECTED, TransactionStatus.ACCEPTED_ON_L1].includes(tx.status)) {
          return tx;
        }
        if (tx.lastChecked === blockHash) {
          return tx;
        }
        try {
          logger.log(`Checking tx status ${tx.starknet_hash}`);
          const newStatus = await getStarknet().provider.getTransactionStatus(tx.starknet_hash);
          logger.log(`New status ${newStatus.tx_status}`);
          return {
            ...tx,
            status: newStatus.tx_status,
            lastChecked: blockHash
          };
        } catch (error) {
          logger.error(`Failed to check transaction status: ${tx.starknet_hash}`);
        }
        return tx;
      };

      const newTransactions = [];
      for (const tx of transactions) {
        const newTransaction = await checkTransaction(tx);
        newTransactions.push(newTransaction);
      }
      logger.log(`Done update transactions`, {newTransactions});
      if (newTransactions.length) {
        setTransactions(newTransactions);
        StorageManager.setItem(LOCAL_STORAGE_TXS_KEY, newTransactions);
      }
    };
    updateTransactions();
  }, [blockHash, transactions]);

  const addTransaction = tx => {
    dispatch({
      type: actions.ADD_TRANSACTION,
      payload: {...tx, timestamp: new Date().getTime()}
    });
  };

  const setTransactions = payload => {
    dispatch({
      type: actions.SET_TRANSACTIONS,
      payload
    });
  };

  const context = {
    transactions,
    addTransaction
  };

  return <TransactionsContext.Provider value={context}>{children}</TransactionsContext.Provider>;
};

TransactionsProvider.displayName = 'TransactionsProvider';

TransactionsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
