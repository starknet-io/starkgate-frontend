import {createContext} from 'react';

import {initialState} from './transactions-reducer';

export const TransactionsContext = createContext({
  ...initialState,
  addTransaction: tx => tx
});
