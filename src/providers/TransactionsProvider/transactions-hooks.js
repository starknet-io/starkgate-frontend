import {useContext} from 'react';

import {TransactionsContext} from './transactions-context';

export const useTransactions = () => {
  const {transactions} = useContext(TransactionsContext);

  return transactions;
};
