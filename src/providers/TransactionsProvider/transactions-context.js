import {createContext} from 'react';

export const TransactionsContext = createContext({
  transactions: [],
  addTransaction: tx => tx
});
