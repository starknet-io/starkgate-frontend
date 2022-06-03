import PropTypes from 'prop-types';
import React, {useEffect, useReducer, useState} from 'react';
import {useWallet} from 'use-wallet';

import {WalletStatus} from '../../enums';
import {calcAccountHash} from '../../utils';
import {WalletsContext} from './wallets-context';
import {useStarknetWallet} from './wallets-hooks';
import {actions, initialState, reducer} from './wallets-reducer';

export const WalletsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [accountHash, setAccountHash] = useState('');
  const {
    status,
    connect,
    reset,
    isConnected,
    error,
    account,
    chainId,
    networkName: chainName
  } = useWallet();
  const {
    status: statusL2,
    connect: connectL2,
    isConnected: isConnectedL2,
    error: errorL2,
    account: accountL2,
    chainId: chainIdL2,
    chainName: chainNameL2
  } = useStarknetWallet();

  useEffect(() => {
    updateL2Wallet({
      account: accountL2,
      status: statusL2,
      chainId: chainIdL2,
      chainName: chainNameL2,
      error: errorL2,
      isConnected: isConnectedL2
    });
  }, [statusL2, errorL2]);

  useEffect(() => {
    // To support serializable object in the store
    const serializedError = status === WalletStatus.ERROR ? {...error} : null;
    updateL1Wallet({
      account,
      status,
      chainId,
      chainName,
      error: serializedError,
      isConnected: isConnected()
    });
  }, [status, error]);

  useEffect(() => {
    if (account && accountL2) {
      setAccountHash(calcAccountHash(account, accountL2));
    }
  }, [account, accountL2]);

  const connectWalletL1 = async walletConfig => {
    const {connectorId} = walletConfig;
    return connect(connectorId).then(() => setL1WalletConfig(walletConfig));
  };

  const resetWalletL1 = () => {
    setL1WalletConfig(null);
    return reset();
  };

  const connectWalletL2 = async walletConfig => {
    return connectL2(walletConfig).then(() => setL2WalletConfig(walletConfig));
  };

  const resetWalletL2 = () => {
    setL2WalletConfig(null);
    return null;
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
    accountHash,
    connectWalletL1,
    connectWalletL2,
    resetWalletL1,
    resetWalletL2
  };

  return <WalletsContext.Provider value={context}>{children}</WalletsContext.Provider>;
};

WalletsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
