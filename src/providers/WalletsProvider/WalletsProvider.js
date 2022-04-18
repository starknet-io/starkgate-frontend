import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import {useWallet} from 'use-wallet';

import {ChainType, WalletStatus} from '../../enums';
import {useEnvs} from '../../hooks';
import {getStarknet} from '../../libs';
import {useIsL1, useIsL2} from '../TransferProvider';
import {WalletsContext} from './wallets-context';
import {actions, initialState, reducer} from './wallets-reducer';

export const WalletsProvider = ({children}) => {
  const {autoConnect} = useEnvs();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {status, connect, reset, isConnected, error, account, chainId, networkName} = useWallet();
  const {selectedAddress, isConnected: isL2Connected, enable} = getStarknet();
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();

  // Handles starknet wallet changes
  useEffect(() => {
    (isL2 || state.l2Wallet.config) && maybeUpdateL2Wallet();
  }, [selectedAddress, isL2Connected]);

  // Handles ethereum wallet changes
  useEffect(() => {
    (isL1 || state.l1Wallet.config) && maybeUpdateL1Wallet();
  }, [status, error, account, chainId, networkName]);

  const connectWallet = async walletConfig => {
    if (isL1) {
      return connectL1Wallet(walletConfig);
    }
    return connectL2Wallet(walletConfig);
  };

  const connectL1Wallet = async walletConfig => {
    const {connectorId} = walletConfig;
    await connect(connectorId);
    setL1WalletConfig(walletConfig);
  };

  const connectL2Wallet = async walletConfig => {
    try {
      const wallet = getStarknet();
      const enabled = await wallet
        .enable(!autoConnect && {showModal: true})
        .then(address => !!address?.length);
      if (enabled) {
        walletConfig.name = wallet.name || walletConfig.name;
        walletConfig.logoPath = wallet.icon || walletConfig.logoPath;
      }

      setL2WalletConfig(walletConfig);
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const resetWallet = () => {
    if (isL1) {
      return resetL1Wallet();
    }
    return resetL2Wallet();
  };

  const resetL1Wallet = () => {
    setL1WalletConfig(null);
    return reset();
  };

  const resetL2Wallet = () => {
    setL2WalletConfig(null);
    return null;
  };

  const swapWallets = async () => {
    if (state.l1Wallet.config && !state.l2Wallet.config) {
      swapToL1();
      maybeUpdateL1Wallet();
    } else if (state.l2Wallet.config && !state.l1Wallet.config) {
      swapToL2();
      await maybeUpdateL2Wallet();
    }
  };

  const maybeUpdateL1Wallet = () => {
    // To support serializable object in the store
    const serializedError = status === 'error' ? {...error} : null;
    updateL1Wallet({
      account,
      status,
      chainId,
      error: serializedError,
      chainName: networkName,
      isConnected: isConnected()
    });
  };

  const maybeUpdateL2Wallet = async () => {
    let status,
      error = null;
    try {
      await enable();
      status = WalletStatus.CONNECTED;
    } catch (ex) {
      error = ex;
      status = WalletStatus.ERROR;
    } finally {
      updateL2Wallet({
        status,
        error,
        chainId: chainId === ChainType.L1.MAIN ? ChainType.L2.MAIN : ChainType.L2.GOERLI,
        isConnected: isL2Connected,
        account: selectedAddress,
        chainName: networkName
      });
    }
  };

  // Dispatchers
  const updateL1Wallet = payload => {
    dispatch({
      type: actions.UPDATE_L1_WALLET,
      payload
    });
  };

  const updateL2Wallet = payload => {
    dispatch({
      type: actions.UPDATE_L2_WALLET,
      payload
    });
  };

  const setL1WalletConfig = payload => {
    dispatch({
      type: actions.SET_L1_WALLET_CONFIG,
      payload
    });
  };

  const setL2WalletConfig = payload => {
    dispatch({
      type: actions.SET_L2_WALLET_CONFIG,
      payload
    });
  };

  // context
  const context = {
    ...state,
    connectWallet,
    connectL1Wallet,
    connectL2Wallet,
    resetWallet,
    resetL1Wallet,
    resetL2Wallet,
    swapWallets
  };

  return <WalletsContext.Provider value={context}>{children}</WalletsContext.Provider>;
};

WalletsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
