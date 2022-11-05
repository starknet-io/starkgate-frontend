import {createContext} from 'react';

export const TransfersLogContext = createContext({
  transfers: [],
  addTransfer: newTransfer => newTransfer,
  updateTransfers: updatedTransfers => updatedTransfers
});
