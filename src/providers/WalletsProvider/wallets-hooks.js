import {useCallback, useContext, useEffect, useState} from 'react';

import {useTransferData} from '../../components/Features/Transfer/Transfer.hooks';
import {WalletsContext} from './wallets-context';

export const useWallets = () => {
  const wallets = useContext(WalletsContext);
  const [activeWallet, setActiveWallet] = useState(wallets.ethereumWallet);
  const {isEthereum} = useTransferData();

  const connectWallet = useCallback(walletConfig => wallets.connectWallet(walletConfig), [wallets]);
  const resetWallet = useCallback(() => wallets.resetWallet(), [wallets]);
  const swapWallets = useCallback(() => wallets.swapWallets(), [wallets]);

  useEffect(() => {
    setActiveWallet(isEthereum ? wallets.ethereumWallet : wallets.starknetWallet);
  }, [isEthereum, wallets]);

  return {
    ...activeWallet,
    connectWallet,
    resetWallet,
    swapWallets
  };
};

export const useEthereumWallet = () => {
  const wallets = useContext(WalletsContext);
  const connectWallet = useCallback(
    walletConfig => wallets.connectEthereumWallet(walletConfig),
    [wallets]
  );

  return {
    connectWallet,
    ...wallets.ethereumWallet
  };
};

export const useStarknetWallet = () => {
  const wallets = useContext(WalletsContext);
  const connectWallet = useCallback(
    walletConfig => wallets.connectStarknetWallet(walletConfig),
    [wallets]
  );

  return {
    connectWallet,
    ...wallets.starknetWallet
  };
};
