import {useCallback, useContext, useState} from 'react';

import {ChainInfo, ChainType, NetworkType, WalletErrorType, WalletStatus} from '../../enums';
import {useEnvs} from '../../hooks';
import {getStarknet, getStarknetWallet, resetStarknetWallet} from '../../libs';
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

export const useStarknetWallet = () => {
  const {AUTO_CONNECT, SUPPORTED_L2_CHAIN_ID} = useEnvs();
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
        .enable(!AUTO_CONNECT && {showModal: true})
        .then(address => address?.length && address[0]);
      if (enabled) {
        updateAccount();
        addAccountChangedListener();
        return {
          ...walletConfig,
          name: wallet.name || walletConfig.name,
          logoPath: wallet.icon || walletConfig.logoPath
        };
      }
    } catch {
      setStatus(WalletStatus.ERROR);
    }
  };

  const reset = () => {
    const disconnected = resetStarknetWallet({clearLastWallet: true, clearDefaultWallet: true});
    if (disconnected) {
      setStatus(WalletStatus.DISCONNECTED);
      setAccount('');
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
    setChainId(chainId);
    setChainName(ChainInfo.L2[chainId].NAME);
    if (chainId === SUPPORTED_L2_CHAIN_ID) {
      setAccount(getStarknet().selectedAddress);
      setStatus(WalletStatus.CONNECTED);
      setError(null);
    } else {
      setStatus(WalletStatus.ERROR);
      setError({name: WalletErrorType.CHAIN_UNSUPPORTED_ERROR});
    }
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

  return {
    account,
    chainId,
    chainName,
    status,
    error,
    connect,
    reset,
    isConnected: getStarknet().isConnected
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
