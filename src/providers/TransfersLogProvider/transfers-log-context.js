import {createContext} from 'react';

export const TransfersLogContext = createContext({
  transfers: [],
  addTransfer: newTransfer => newTransfer,
  updateTransfer: transfer => transfer
});
