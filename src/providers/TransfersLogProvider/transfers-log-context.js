import {createContext} from 'react';

export const TransfersLogContext = createContext({
  transfers: [],
  addTransfer: t => t
});
