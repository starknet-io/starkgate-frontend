import {useCallback, useContext} from 'react';

import {useTransfer} from '@providers';
import {isL1Network} from '@starkware-webapps/enums';

import {WalletsContext} from './wallets-context';

export const useWallets = network => {
  const walletL1 = useL1Wallet();
  const walletL2 = useL2Wallet();
  const {isL1} = useTransfer();

  const getWallet = () => {
    if (network) {
      return isL1Network(network) ? walletL1 : walletL2;
    }
    return isL1 ? walletL1 : walletL2;
  };

  return getWallet();
};

export const useAccountHash = () => {
  const {accountHash} = useContext(WalletsContext);
  return accountHash;
};

export const useL1Wallet = () => {
  const wallets = useContext(WalletsContext);

  const connectWallet = useCallback(
    walletConfig => wallets.connectWalletL1(walletConfig),
    [wallets]
  );

  const resetWallet = useCallback(() => {
    return wallets.resetWalletL1();
  }, [wallets]);

  return {
    connectWallet,
    resetWallet,
    ...wallets.walletL1
  };
};

export const useL2Wallet = () => {
  const wallets = useContext(WalletsContext);

  const connectWallet = useCallback(params => wallets.connectWalletL2(params), [wallets]);

  const resetWallet = useCallback(() => {
    return wallets.resetWalletL2();
  }, [wallets]);

  return {
    connectWallet,
    resetWallet,
    ...wallets.walletL2
  };
};

export const useWalletsStatus = () => {
  const {status: statusL1} = useL1Wallet();
  const {status: statusL2} = useL2Wallet();

  return {
    statusL1,
    statusL2
  };
};
