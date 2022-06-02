import PropTypes from 'prop-types';
import React, {useEffect, useReducer, useState} from 'react';
import {useWallet} from 'use-wallet';

import {WalletStatus} from '../../enums';
import {calcAccountHash} from '../../utils';
import {useIsL1, useIsL2} from '../TransferProvider';
import {WalletsContext} from './wallets-context';
import {useStarknetWallet} from './wallets-hooks';
import {actions, initialState, reducer} from './wallets-reducer';

export const WalletsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {status, connect, reset, isConnected, error, account, chainId, networkName} = useWallet();
  const {
    status: statusL2,
    connect: connectL2,
    isConnected: isConnectedL2,
    error: errorL2,
    account: accountL2,
    chainId: chainIdL2,
    networkName: networkNameL2
  } = useStarknetWallet();
  const [isL1, swapToL1] = useIsL1();
  const [isL2, swapToL2] = useIsL2();
  const [accountHash, setAccountHash] = useState('');

  useEffect(() => {
    (isL2 || state.walletL2.config) && maybeUpdateL2Wallet();
  }, [statusL2, errorL2, accountL2, chainIdL2, networkNameL2]);

  useEffect(() => {
    (isL1 || state.walletL1.config) && maybeUpdateL1Wallet();
  }, [status, error, account, chainId, networkName]);

  useEffect(() => {
    if (account && accountL2) {
      setAccountHash(calcAccountHash(account, accountL2));
    }
  }, [account, accountL2]);

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
    return connectL2(walletConfig).then(() => setL2WalletConfig(walletConfig));
  };

  const resetL2Wallet = () => {
    setL2WalletConfig(null);
    return null;
  };

  const swapWallets = async () => {
    if (state.walletL1.config && !state.walletL2.config) {
      swapToL1();
      maybeUpdateL1Wallet();
    } else if (state.walletL2.config && !state.walletL1.config) {
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
      status: statusL2,
      error: errorL2,
      chainId: chainIdL2,
      isConnected: isConnectedL2,
      account: accountL2,
      chainName: networkNameL2
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
    accountHash,
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
