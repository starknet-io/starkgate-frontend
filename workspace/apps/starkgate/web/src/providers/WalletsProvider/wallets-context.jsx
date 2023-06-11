import {createContext} from 'react';

import {initialState} from './wallets-reducer';

export const WalletsContext = createContext({
  ...initialState,
  accountHash: '',
  connectWalletL1: () => ({}),
  connectWalletL2: () => ({}),
  resetWalletL1: () => ({}),
  resetWalletL2: () => ({})
});
