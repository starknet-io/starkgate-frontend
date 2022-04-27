import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';
import {useWallet} from 'use-wallet';

import {WalletStatus} from '../../enums';
import {useIsL1, useIsL2} from '../TransferProvider';
import {WalletsContext} from './wallets-context';
import {useStarknetWallet} from './wallets-hooks';
import {actions, initialState, reducer} from './wallets-reducer';

export const WalletsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {status, connect, reset, isConnected, error, account, chainId, networkName} = useWallet();
  const {
    status: l2Status,
    connect: l2Connect,
    isConnected: l2IsConnected,
    error: l2Error,
    account: l2Account,
    chainId: l2ChainId,
    networkName: l2NetworkName
  } = useStarknetWallet();
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();

  useEffect(() => {
    (isL2 || state.l2Wallet.config) && maybeUpdateL2Wallet();
  }, [l2Status, l2Error, l2Account, l2ChainId, l2NetworkName]);

  useEffect(() => {
    (isL1 || state.l1Wallet.config) && maybeUpdateL1Wallet();
  }, [status, error, account, chainId, networkName]);

  const connectWallet = async walletConfig => {
    return isL1 ? connectL1Wallet(walletConfig) : connectL2Wallet(walletConfig);
  };

  const resetWallet = () => {
    return isL1 ? resetL1Wallet() : resetL2Wallet();
  };

  const connectL1Wallet = async walletConfig => {
    const {connectorId} = walletConfig;
    return connect(connectorId).then(() => setL1WalletConfig(walletConfig));
  };

  const resetL1Wallet = () => {
    setL1WalletConfig(null);
    return reset();
  };

  const connectL2Wallet = async walletConfig => {
    return l2Connect(walletConfig).then(() => setL2WalletConfig(walletConfig));
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
      maybeUpdateL2Wallet();
    }
  };

  const maybeUpdateL1Wallet = () => {
    // To support serializable object in the store
    const serializedError = status === WalletStatus.ERROR ? {...error} : null;
    updateL1Wallet({
      account,
      status,
      chainId,
      error: serializedError,
      chainName: networkName,
      isConnected: isConnected()
    });
  };

  const maybeUpdateL2Wallet = () => {
    updateL2Wallet({
      status: l2Status,
      error: l2Error,
      chainId: l2ChainId,
      isConnected: l2IsConnected,
      account: l2Account,
      chainName: l2NetworkName
    });
  };

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
