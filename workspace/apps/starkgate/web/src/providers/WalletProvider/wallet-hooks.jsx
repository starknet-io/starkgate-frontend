import {useContext} from 'react';

import {WalletContext} from '@providers';

export const useWallet = () => {
  const {logout, account, accountHash, walletId} = useContext(WalletContext);

  return {
    logout,
    account,
    accountHash,
    walletId
  };
};

export const useEthereumWallet = () => {
  const {
    ethereumWalletId,
    ethereumWalletName,
    ethereumWallet,
    ethereumAccount,
    getEthereumSigner,
    getEthereumProvider
  } = useContext(WalletContext);

  return {
    ethereumWalletId,
    ethereumWalletName,
    ethereumWallet,
    ethereumAccount,
    getEthereumSigner,
    getEthereumProvider
  };
};

export const useStarknetWallet = () => {
  const {
    starknetWalletId,
    starknetWalletName,
    starknetAccount,
    starknetWallet,
    getStarknetSigner,
    getStarknetProvider
  } = useContext(WalletContext);

  return {
    starknetWalletId,
    starknetWalletName,
    starknetAccount,
    starknetWallet,
    getStarknetSigner,
    getStarknetProvider
  };
};

export const useWallets = () => {
  const starknetWallet = useStarknetWallet();
  const ethereumWallet = useEthereumWallet();

  return {
    ...starknetWallet,
    ...ethereumWallet
  };
};

export const useWalletLogin = () => {
  const {
    isConnected,
    isConnecting,
    isDisconnected,
    isStarknetWalletConnected,
    isEthereumWalletConnected,
    login
  } = useContext(WalletContext);

  return {
    isConnected,
    isConnecting,
    isDisconnected,
    isStarknetWalletConnected,
    isEthereumWalletConnected,
    login
  };
};
