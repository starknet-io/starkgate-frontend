import {createContext} from 'react';

import {initialState} from './reducer';

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
