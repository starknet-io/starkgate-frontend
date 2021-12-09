import {getStarknet} from '@argent/get-starknet';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer, useState} from 'react';
import {useWallet} from 'use-wallet';

import {
  useIsEthereum,
  useIsStarknet
} from '../../components/Features/Transfer/Transfer/Transfer.hooks';
import {WalletStatus} from '../../enums';
import {web3} from '../../web3';
import {CombineWalletsContext} from './context';
import {actions, initialState, reducer} from './reducer';

export const CombineWalletsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ethereumPendingWalletConfig, setEthereumPendingWalletConfig] = useState({});
  const [starknetPendingWalletConfig, setStarknetPendingWalletConfig] = useState({});
  const {status, connect, reset, isConnected, error, account, chainId, networkName} = useWallet();
  const {selectedAddress, isConnected: isStarknetConnected, enable} = getStarknet();
  const [isEthereum, setEthereum] = useIsEthereum();
  const [isStarknet, setStarknet] = useIsStarknet();

  // Handles starknet wallet changes
  useEffect(async () => {
    if (isStarknet) {
      if (isStarknetConnected && !state.starknetWallet.config) {
        setStarknetWalletConfig(starknetPendingWalletConfig);
      }
      await maybeUpdateStarknetWallet();
    }
  }, [selectedAddress, isStarknetConnected]);

  // Handles ethereum wallet changes
  useEffect(async () => {
    if (isEthereum) {
      if (isConnected() && !state.ethereumWallet.config) {
        setEthereumWalletConfig(ethereumPendingWalletConfig);
      }
      maybeUpdateEthereumWallet();
    }
  }, [status, error, account, chainId, networkName]);

  const connectWallet = async walletConfig => {
    if (isEthereum) {
      setEthereumPendingWalletConfig(walletConfig);
      const {connectorId} = walletConfig;
      await connect(connectorId);
      maybeUpdateEthereumWallet();
    } else {
      setStarknetPendingWalletConfig(walletConfig);
      await getStarknet({showModal: true}).enable();
      await maybeUpdateStarknetWallet();
    }
  };

  const resetWallet = () => {
    if (isEthereum) {
      setEthereumWalletConfig(null);
      return reset();
    } else {
      setStarknetWalletConfig(null);
      return null;
    }
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
    resetWallet,
    swapWallets
  };

  return (
    <CombineWalletsContext.Provider value={context}>{children}</CombineWalletsContext.Provider>
  );
};

CombineWalletsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
