import {createContext} from 'react';

import {WalletStatus} from '../../enums';

export const CombineWalletsContext = createContext({
  ethereumWallet: {
    library: null,
    account: '',
    isConnected: false,
    status: WalletStatus.DISCONNECTED,
    chainName: '',
    chainId: -1,
    error: null,
    config: null
  },
  starknetWallet: {
    library: null,
    account: '',
    isConnected: false,
    status: WalletStatus.DISCONNECTED,
    chainName: '',
    chainId: -1,
    error: null,
    config: null
  },
  connectWallet: () => {},
  resetWallet: () => {},
  swapWallets: () => {}
});
