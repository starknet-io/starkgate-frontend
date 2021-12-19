import {createContext} from 'react';

import {initialState} from './wallets-reducer';

export const WalletsContext = createContext({
  ...initialState,
  connectEthereumWallet: () => {},
  connectStarknetWallet: () => {},
  connectWallet: () => {},
  resetWallet: () => {},
  resetEthereumWallet: () => {},
  resetStarknetWallet: () => {},
  swapWallets: () => {}
});
