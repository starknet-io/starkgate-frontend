import {createContext} from 'react';

import {initialState} from './reducer';

export const TransactionsContext = createContext({
  ...initialState,
  setTransactions: () => {}
});
