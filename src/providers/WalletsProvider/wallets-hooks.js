import {useCallback, useContext, useEffect, useState} from 'react';

import {useTransferData} from '../../components/Features/Transfer/Transfer.hooks';
import {WalletsContext} from './wallets-context';

export const useWallets = () => {
  const wallets = useContext(WalletsContext);
  const [activeWallet, setActiveWallet] = useState(wallets.l1Wallet);
  const {isL1} = useTransferData();

  const connectWallet = useCallback(walletConfig => wallets.connectWallet(walletConfig), []);
  const resetWallet = useCallback(() => wallets.resetWallet(), []);
  const swapWallets = useCallback(() => wallets.swapWallets(), []);

  useEffect(() => {
    setActiveWallet(isL1 ? wallets.l1Wallet : wallets.l2Wallet);
  }, [isL1, wallets]);

  return {
    ...activeWallet,
    connectWallet,
    resetWallet,
    swapWallets
  };
};

export const useL1Wallet = () => {
  const wallets = useContext(WalletsContext);
  const connectWallet = useCallback(walletConfig => wallets.connectL1Wallet(walletConfig), []);

  return {
    connectWallet,
    ...wallets.l1Wallet
  };
};

export const useL2Wallet = () => {
  const wallets = useContext(WalletsContext);
  const connectWallet = useCallback(walletConfig => wallets.connectL2Wallet(walletConfig), []);

  return {
    connectWallet,
    ...wallets.l2Wallet
  };
};
