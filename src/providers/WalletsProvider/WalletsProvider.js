import {getStarknet} from '@argent/get-starknet';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useReducer} from 'react';
import {useWallet} from 'use-wallet';

import {useIsEthereum, useIsStarknet} from '../../components/Features/Transfer/Transfer.hooks';
import {WalletStatus} from '../../enums';
import {useConfig} from '../../hooks';
import {web3} from '../../web3';
import {WalletsContext} from './wallets-context';
import {actions, initialState, reducer} from './wallets-reducer';

export const WalletsProvider = ({children}) => {
  const {autoConnect} = useConfig();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {status, connect, reset, isConnected, error, account, chainId, networkName} = useWallet();
  const {selectedAddress, isConnected: isStarknetConnected, enable} = getStarknet();
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();

  const connectWallet = async walletConfig => {
    if (isEthereum) {
      return connectEthereumWallet(walletConfig);
    }
    return connectStarknetWallet(walletConfig);
  };

  const connectEthereumWallet = async walletConfig => {
    const {connectorId} = walletConfig;
    await connect(connectorId);
    setEthereumWalletConfig(walletConfig);
  };

  const connectStarknetWallet = async walletConfig => {
    await getStarknet(!autoConnect && {showModal: true}).enable();
    setStarknetWalletConfig(walletConfig);
  };

  const resetWallet = () => {
    if (isEthereum) {
      return resetEthereumWallet();
    }
    return resetStarknetWallet();
  };

  const resetEthereumWallet = () => {
    setEthereumWalletConfig(null);
    return reset();
  };

  const resetStarknetWallet = () => {
    setStarknetWalletConfig(null);
    return null;
  };

  const swapWallets = async () => {
    if (state.ethereumWallet.config && !state.starknetWallet.config) {
      setEthereum();
      maybeUpdateEthereumWallet();
    } else if (state.starknetWallet.config && !state.ethereumWallet.config) {
      setStarknet();
      await maybeUpdateStarknetWallet();
    }
  };

  const maybeUpdateEthereumWallet = useCallback(() => {
    // To support serializable object in the store
    let serialError = error ? {...error} : null;
    updateEthereumWallet({
      account,
      status,
      chainId,
      error: serialError,
      chainName: networkName,
      isConnected: isConnected(),
      library: web3
    });
  }, [account, status, chainId, error, isConnected, networkName]);

  const maybeUpdateStarknetWallet = useCallback(async () => {
    let status,
      error = null;
    try {
      await enable();
      status = WalletStatus.CONNECTED;
    } catch (ex) {
      error = ex;
      status = WalletStatus.ERROR;
    } finally {
      updateStarknetWallet({
        status,
        chainId,
        error,
        isConnected: isStarknetConnected,
        account: selectedAddress,
        chainName: networkName,
        library: getStarknet()
      });
    }
  }, [chainId, enable, isStarknetConnected, networkName, selectedAddress]);

  // Handles starknet wallet changes
  useEffect(() => {
    (isStarknet || state.starknetWallet.config) && maybeUpdateStarknetWallet();
  }, [
    selectedAddress,
    isStarknetConnected,
    isStarknet,
    state.starknetWallet.config,
    maybeUpdateStarknetWallet
  ]);

  // Handles ethereum wallet changes
  useEffect(() => {
    (isEthereum || state.ethereumWallet.config) && maybeUpdateEthereumWallet();
  }, [
    status,
    error,
    account,
    chainId,
    networkName,
    isEthereum,
    state.ethereumWallet.config,
    maybeUpdateEthereumWallet
  ]);

  // Dispatchers
  const updateEthereumWallet = payload => {
    dispatch({
      type: actions.UPDATE_ETHEREUM_WALLET,
      payload
    });
  };

  const updateStarknetWallet = payload => {
    dispatch({
      type: actions.UPDATE_STARKNET_WALLET,
      payload
    });
  };

  const setEthereumWalletConfig = payload => {
    dispatch({
      type: actions.SET_ETHEREUM_WALLET_CONFIG,
      payload
    });
  };

  const setStarknetWalletConfig = payload => {
    dispatch({
      type: actions.SET_STARKNET_WALLET_CONFIG,
      payload
    });
  };

  // context
  const context = {
    ...state,
    connectWallet,
    connectEthereumWallet,
    connectStarknetWallet,
    resetWallet,
    resetEthereumWallet,
    resetStarknetWallet,
    swapWallets
  };

  return <WalletsContext.Provider value={context}>{children}</WalletsContext.Provider>;
};

WalletsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
