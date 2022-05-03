import {useCallback, useContext, useEffect, useState} from 'react';

import {ChainInfo, ChainType, WalletErrorType, WalletStatus} from '../../enums';
import {useEnvs} from '../../hooks';
import {getStarknet, getStarknetWallet} from '../../libs';
import {useTransfer} from '../TransferProvider';
import {WalletsContext} from './wallets-context';

export const useWallets = () => {
  const wallets = useContext(WalletsContext);
  const {isL1} = useTransfer();
  const [activeWallet, setActiveWallet] = useState(wallets.l1Wallet);

  const connectWallet = useCallback(
    walletConfig => wallets.connectWallet(walletConfig),
    [isL1, wallets]
  );

  const resetWallet = useCallback(() => wallets.resetWallet(), [isL1, wallets]);

  const swapWallets = useCallback(() => wallets.swapWallets(), [isL1, wallets]);

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

export const useAccountHash = () => {
  const {accountHash} = useContext(WalletsContext);
  return accountHash;
};

export const useL1Wallet = () => {
  const wallets = useContext(WalletsContext);

  const connectWallet = useCallback(
    walletConfig => wallets.connectL1Wallet(walletConfig),
    [wallets]
  );

  return {
    connectWallet,
    ...wallets.l1Wallet
  };
};

export const useL2Wallet = () => {
  const wallets = useContext(WalletsContext);

  const connectWallet = useCallback(
    walletConfig => wallets.connectL2Wallet(walletConfig),
    [wallets]
  );

  return {
    connectWallet,
    ...wallets.l2Wallet
  };
};

export const useStarknetWallet = () => {
  const {autoConnect, supportedChainId} = useEnvs();
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [networkName, setNetworkName] = useState('');
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
    setNetworkName(ChainInfo.L2[chainId].NAME);
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

  const isChainValid = chainId => {
    return (
      (chainId === ChainType.L2.MAIN && supportedChainId === ChainType.L1.MAIN) ||
      (chainId === ChainType.L2.GOERLI && supportedChainId === ChainType.L1.GOERLI)
    );
  };

  const handleChain = chainId => {
    if (isChainValid(chainId)) {
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
    networkName,
    status,
    error,
    connect,
    isConnected: getStarknet().isConnected
  };
};
