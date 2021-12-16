import {getStarknet} from '@argent/get-starknet';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import {useWallet} from 'use-wallet';

import {
  useIsEthereum,
  useIsStarknet
} from '../../components/Features/Transfer/Transfer/Transfer.hooks';
import {WalletStatus} from '../../enums';
import {web3} from '../../web3';
import {WalletsContext} from './context';
import {actions, initialState, reducer} from './reducer';

export const WalletsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {status, connect, reset, isConnected, error, account, chainId, networkName} = useWallet();
  const {selectedAddress, isConnected: isStarknetConnected, enable} = getStarknet();
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();

  // Handles starknet wallet changes
  useEffect(() => {
    (isStarknet || state.starknetWallet.config) && maybeUpdateStarknetWallet();
  }, [selectedAddress, isStarknetConnected]);

  // Handles ethereum wallet changes
  useEffect(() => {
    (isEthereum || state.ethereumWallet.config) && maybeUpdateEthereumWallet();
  }, [status, error, account, chainId, networkName]);

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
    await getStarknet({showModal: true}).enable();
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

  const maybeUpdateEthereumWallet = () => {
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
  };

  const maybeUpdateStarknetWallet = async () => {
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
  };

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
