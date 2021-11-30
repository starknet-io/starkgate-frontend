import {createContext} from 'react';

import {WalletStatus} from './Wallet.enums';

export const WalletsContext = createContext({
  account: '',
  isConnected: false,
  status: WalletStatus.DISCONNECTED,
  chainName: '',
  chainId: -1,
  error: null,
  connectWallet: () => {},
  resetWallet: () => {},
  swapWallets: () => {}
});
