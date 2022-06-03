import {useCallback, useContext, useState} from 'react';

import {ChainInfo, ChainType, WalletErrorType, WalletStatus} from '../../enums';
import {useEnvs} from '../../hooks';
import {getStarknet, getStarknetWallet} from '../../libs';
import {useTransfer} from '../TransferProvider';
import {WalletsContext} from './wallets-context';

export const useWallets = () => {
  const wallets = useContext(WalletsContext);
  const {isL1} = useTransfer();

  const connectWallet = useCallback(
    walletConfig =>
      isL1 ? wallets.connectWalletL1(walletConfig) : wallets.connectWalletL2(walletConfig),
    [isL1, wallets]
  );

  const resetWallet = useCallback(
    () => (isL1 ? wallets.resetWalletL1() : wallets.resetWalletL2()),
    [isL1, wallets]
  );

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

export const useStarknetWallet = () => {
  const {autoConnect, supportedL2ChainId} = useEnvs();
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [chainName, setChainName] = useState('');
  const [status, setStatus] = useState(WalletStatus.DISCONNECTED);

  const connect = async walletConfig => {
    try {
      const wallet = await getStarknetWallet();
      if (!wallet) {
        return;
      }
      setStatus(WalletStatus.CONNECTING);
      const enabled = await wallet
        .enable(!autoConnect && {showModal: true})
        .then(address => !!address?.length);

      if (enabled) {
        walletConfig.name = wallet.name || walletConfig.name;
        walletConfig.logoPath = wallet.icon || walletConfig.logoPath;
        updateAccount();
        addAccountChangedListener();
      }
    } catch {
      setStatus(WalletStatus.ERROR);
    }
  };

  const addAccountChangedListener = () => {
    getStarknet().on('accountsChanged', () => {
      setStatus(WalletStatus.DISCONNECTED);
      updateAccount();
    });
  };

  const updateAccount = () => {
    const chainId = getCurrentChainId();
    setAccount(getStarknet().selectedAddress);
    setChainId(chainId);
    setChainName(ChainInfo.L2[chainId].NAME);
    handleChain(chainId);
  };

  const getCurrentChainId = () => {
    const {baseUrl} = getStarknet().provider;
    if (baseUrl.includes('alpha-mainnet.starknet.io')) {
      return ChainType.L2.MAIN;
    } else if (baseUrl.includes('alpha4.starknet.io')) {
      return ChainType.L2.GOERLI;
    } else if (baseUrl.match(/^https?:\/\/localhost.*/)) {
      return 'localhost';
    }
  };

  const handleChain = chainId => {
    if (chainId === supportedL2ChainId) {
      setStatus(WalletStatus.CONNECTED);
      setError(null);
    } else {
      setStatus(WalletStatus.ERROR);
      setError({name: WalletErrorType.CHAIN_UNSUPPORTED_ERROR});
    }
  };

  return {
    account,
    chainId,
    chainName,
    status,
    error,
    connect,
    isConnected: getStarknet().isConnected
  };
};
