import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {StorageManager} from '../../services';
import {TransactionsContext} from './transactions-context';
import {actions, initialState, reducer} from './transactions-reducer';

const LOCAL_STORAGE_KEY = 'STARKNET_BRIDGE_TXS';

export const TransactionsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedTxs = StorageManager.getItem(LOCAL_STORAGE_KEY);
    if (storedTxs) {
      setTransactions(storedTxs);
    }
  }, []);

  const setTransactions = payload => {
    dispatch({
      type: actions.SET_TRANSACTIONS,
      payload
    });
  };

  const context = {
    transactions: state,
    setTransactions
  };

  return <TransactionsContext.Provider value={context}>{children}</TransactionsContext.Provider>;
};

TransactionsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
