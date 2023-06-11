import {createContext} from 'react';

export const TransferLogContext = createContext({
  transfersQueryL1: {},
  transfersQueryL2: {},
  pendingWithdrawalsQuery: {}
});
