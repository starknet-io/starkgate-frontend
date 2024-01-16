import {createContext} from 'react';

export const WalletContext = createContext({
  // useWalletLogin
  isConnected: false,
  isDisconnected: false,
  login: () => null,
  isStarknetWalletConnected: () => false,
  isEthereumWalletConnected: () => false,
  // useWallet
  logout: () => Promise.resolve(null),
  account: null,
  accountHash: null,
  walletId: null,
  // useEthereumWallet
  ethereumWalletId: null,
  ethereumWalletName: null,
  ethereumWallet: null,
  ethereumAccount: null,
  getEthereumSigner: () => null,
  getEthereumProvider: () => null,
  // useStarknetWallet
  starknetWalletId: null,
  starknetWalletName: null,
  starknetAccount: null,
  starknetWallet: null,
  getStarknetSigner: () => null,
  getStarknetProvider: () => null
});
