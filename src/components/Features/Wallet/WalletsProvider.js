import {getStarknet} from '@argent/get-starknet';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer, useState} from 'react';
import {useWallet} from 'use-wallet';

import {WalletType} from '../../../enums';
import {useIsEthereum, useIsStarknet, useTransferData} from '../Transfer/Transfer.hooks';
import {WalletStatus} from './Wallet.enums';
import {WalletsContext} from './Wallets.context';
import {actions, initialState, reducer} from './Wallets.reducer';

export const WalletsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pendingWalletConfig, setPendingWalletConfig] = useState({});
  const {status, connect, reset, isConnected, error, account, chainId, networkName} = useWallet();
  const {selectedAddress, isConnected: isStarknetConnected, enable} = getStarknet();
  const {action} = useTransferData();
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();
  const walletConfigMap = {
    [WalletType.L1]: state.l1WalletConfig,
    [WalletType.L2]: state.l2WalletConfig
  };

  // Handles action change
  useEffect(async () => {
    if (isEthereum && isConnected()) {
      setL1Wallet();
    } else if (isStarknet && isStarknetConnected) {
      await setL2Wallet();
    } else {
      resetActiveWallet();
    }
  }, [action]);

  // Handles L2 wallet changes
  useEffect(async () => {
    if (isStarknet) {
      if (isStarknetConnected && !isWalletConnected(WalletType.L2)) {
        setWalletConfig();
      }
      await setL2Wallet();
    }
  }, [selectedAddress, isStarknetConnected]);

  // Handles L1 wallet changes
  useEffect(async () => {
    if (isEthereum) {
      if (isConnected() && !isWalletConnected(WalletType.L1)) {
        setWalletConfig();
      }
      setL1Wallet();
    }
  }, [status, error, account, chainId, networkName]);

  const connectWallet = async walletConfig => {
    setPendingWalletConfig(walletConfig);
    if (isEthereum) {
      const {connectorId} = walletConfig;
      await connect(connectorId);
      setL1Wallet();
    } else {
      await getStarknet({showModal: true}).enable();
      await setL2Wallet();
    }
  };

  const resetWallet = () => {
    resetWalletConfig();
    if (isEthereum) {
      return reset();
    } else {
      return null;
    }
  };

  const swapWallets = async () => {
    if (isWalletConnected(WalletType.L1) && !isWalletConnected(WalletType.L2)) {
      setEthereum();
      setL1Wallet();
    } else if (isWalletConnected(WalletType.L2) && !isWalletConnected(WalletType.L1)) {
      setStarknet();
      await setL2Wallet();
    }
  };

  const setL1Wallet = () => {
    // To support serializable object in the store
    let serialError = error ? {...error} : null;
    setActiveWallet({
      type: WalletType.L1,
      account,
      status,
      chainId,
      error: serialError,
      chainName: networkName,
      isConnected: isConnected()
    });
  };

  const setL2Wallet = async () => {
    let status,
      error = null;
    try {
      await enable();
      status = WalletStatus.CONNECTED;
    } catch (err) {
      error = err;
      status = WalletStatus.ERROR;
    } finally {
      setActiveWallet({
        type: WalletType.L2,
        status,
        chainId,
        error,
        isConnected: isStarknetConnected,
        account: selectedAddress,
        chainName: networkName
      });
    }
  };

  const isWalletConnected = walletType => {
    return !!walletConfigMap[walletType];
  };

  const activeWallet = () => {
    const config = walletConfigMap[state.activeWallet.type];
    const {name, buttonLogoPath: logoPath} = config || {};
    return {
      ...state.activeWallet,
      name,
      logoPath
    };
  };

  // Dispatchers

  const setActiveWallet = walletData => {
    dispatch({
      type: actions.SET_ACTIVE_WALLET_ACTION,
      payload: walletData
    });
  };

  const resetActiveWallet = () => {
    dispatch({
      type: actions.RESET_ACTIVE_WALLET_ACTION
    });
  };

  const setWalletConfig = () => {
    dispatch({
      type: actions.SET_WALLET_CONFIG_ACTION,
      payload: pendingWalletConfig
    });
  };

  const resetWalletConfig = () => {
    dispatch({
      type: actions.RESET_WALLET_CONFIG_ACTION
    });
  };

  // context

  const context = {
    ...activeWallet(),
    connectWallet,
    resetWallet,
    swapWallets
  };

  return <WalletsContext.Provider value={context}>{children}</WalletsContext.Provider>;
};

WalletsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
