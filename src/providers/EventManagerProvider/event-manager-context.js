import {createContext} from 'react';

export const EventManagerContext = createContext({
  addDepositListener: (filter, callback) => ({filter, callback}),
  addWithdrawalListener: (filter, callback) => ({filter, callback})
});
