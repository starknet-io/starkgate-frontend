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
  const walletL1 = useWallet();
  const walletL2 = useStarknetWallet();

  const {account: accountL1, status: statusL1, error: errorL1} = walletL1;
  const {account: accountL2, status: statusL2, error: errorL2} = walletL2;

  useEffect(() => {
    updateL2Wallet(walletL2);
  }, [statusL2, errorL2]);

  useEffect(() => {
    // To support serializable object in the store
    const serializedError = statusL1 === WalletStatus.ERROR ? {...errorL1} : null;
    updateL1Wallet({
      ...walletL1,
      error: serializedError,
      isConnected: walletL1.isConnected()
    });
  }, [statusL1, errorL1]);

  useEffect(() => {
    if (accountL1 && accountL2) {
      setAccountHash(calcAccountHash(accountL1, accountL2));
    }
  }, [accountL1, accountL2]);

  const connectWalletL1 = async walletConfig => {
    const {connectorId} = walletConfig;
    return walletL1.connect(connectorId).then(() => setL1WalletConfig(walletConfig));
  };

  const resetWalletL1 = () => {
    setL1WalletConfig(null);
    return walletL1.reset();
  };

  const connectWalletL2 = async walletConfig => {
    return walletL2.connect(walletConfig).then(() => setL2WalletConfig(walletConfig));
  };

  const resetWalletL2 = () => {
    setL2WalletConfig(null);
    return walletL2.reset();
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
