import {createContext} from 'react';

export const TransfersContext = createContext({
  transfers: [],
  addTransfer: t => t
});
