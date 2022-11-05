import {createContext} from 'react';

import {initialState} from './wallets-reducer';

export const WalletsContext = createContext({
  ...initialState,
  accountHash: '',
  connectL1Wallet: () => {},
  connectL2Wallet: () => {},
  connectWallet: () => {},
  resetWallet: () => {},
  resetL1Wallet: () => {},
  resetL2Wallet: () => {},
  swapWallets: () => {}
});
