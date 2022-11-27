import {calcAccountHash} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {useEffect, useReducer, useState} from 'react';

import {useEnvs, useEthereumWallet, useStarknetWallet} from '../../hooks';
import {WalletsContext} from './wallets-context';
import {actions, initialState, reducer} from './wallets-reducer';

export const WalletsProvider = ({children}) => {
  const {ENABLE_SCREENING} = useEnvs();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [accountHash, setAccountHash] = useState('');
  const walletL1 = useEthereumWallet({enableScreening: ENABLE_SCREENING});
  const walletL2 = useStarknetWallet();

  const {account: accountL1, status: statusL1, error: errorL1} = walletL1;
  const {account: accountL2, status: statusL2, error: errorL2} = walletL2;

  useEffect(() => {
    updateWalletL2(walletL2);
  }, [accountL2, statusL2, errorL2]);

  useEffect(() => {
    updateWalletL1(walletL1);
  }, [accountL1, statusL1, errorL1]);

  useEffect(() => {
    if (accountL1 && accountL2) {
      setAccountHash(calcAccountHash(accountL1, accountL2));
    } else if (accountHash) {
      setAccountHash('');
    }
  }, [accountL1, accountL2]);

  const connectWalletL1 = async walletConfig => {
    const {connectorId} = walletConfig;
    return walletL1.connect(connectorId).then(() => setWalletConfigL1(walletConfig));
  };

  const resetWalletL1 = () => {
    setWalletConfigL1(null);
    return walletL1.reset();
  };

  const connectWalletL2 = async walletConfig => {
    return walletL2
      .connect(walletConfig)
      .then(chosenWalletConfig => setWalletConfigL2(chosenWalletConfig));
  };

  const resetWalletL2 = () => {
    setWalletConfigL2(null);
    return walletL2.reset();
  };

  const updateWalletL1 = payload => {
    dispatch({
      type: actions.UPDATE_WALLET_L1,
      payload
    });
  };

  const updateWalletL2 = payload => {
    dispatch({
      type: actions.UPDATE_WALLET_L2,
      payload
    });
  };

  const setWalletConfigL1 = payload => {
    dispatch({
      type: actions.SET_WALLET_CONFIG_L1,
      payload
    });
  };

  const setWalletConfigL2 = payload => {
    dispatch({
      type: actions.SET_WALLET_CONFIG_L2,
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
