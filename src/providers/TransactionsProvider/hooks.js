import {useContext} from 'react';

import {TransactionsContext} from './context';

export const useTransactions = () => {
  const {transactions} = useContext(TransactionsContext);

  return transactions;
};
