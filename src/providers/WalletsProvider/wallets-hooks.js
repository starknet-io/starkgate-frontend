import {NetworkType} from '@starkware-industries/commons-js-enums';
import {useCallback, useContext} from 'react';

import {useTransfer} from '../TransferProvider';
import {WalletsContext} from './wallets-context';

export const useWallets = () => {
  const wallets = useContext(WalletsContext);
  const {isL1} = useTransfer();

  const connectWallet = useCallback(
    walletConfig => {
      return isL1 ? wallets.connectWalletL1(walletConfig) : wallets.connectWalletL2(walletConfig);
    },
    [isL1, wallets]
  );

  const resetWallet = useCallback(() => {
    return isL1 ? wallets.resetWalletL1() : wallets.resetWalletL2();
  }, [isL1, wallets]);

  return {
    ...(isL1 ? wallets.walletL1 : wallets.walletL2),
    connectWallet,
    resetWallet
  };
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

  return {
    connectWallet,
    ...wallets.walletL1
  };
};

export const useL2Wallet = () => {
  const wallets = useContext(WalletsContext);

  const connectWallet = useCallback(
    walletConfig => wallets.connectWalletL2(walletConfig),
    [wallets]
  );

  return {
    connectWallet,
    ...wallets.walletL2
  };
};

export const useLoginWallet = network => {
  const walletL1 = useL1Wallet();
  const walletL2 = useL2Wallet();
  const {error, status, connectWallet} = network === NetworkType.L1 ? walletL1 : walletL2;

  return {
    walletError: error,
    walletStatus: status,
    connectWallet
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
