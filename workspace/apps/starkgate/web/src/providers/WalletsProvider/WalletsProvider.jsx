import PropTypes from 'prop-types';
import React, {useEffect, useReducer, useState} from 'react';
import {hash} from 'starknet';

import {useEnvs, useEthereumWallet, useStarknetWallet} from '@hooks';
import {parseToFelt} from '@starkware-webapps/web3-utils';

import {WalletsContext} from './wallets-context';
import {actions, initialState, reducer} from './wallets-reducer';

export const WalletsProvider = ({children}) => {
  const {ENABLE_SCREENING} = useEnvs();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [accountHash, setAccountHash] = useState('');
  const walletL1 = useEthereumWallet({
    enableScreening: ENABLE_SCREENING
  });
  const walletL2 = useStarknetWallet();

  const {account: accountL1, status: statusL1, error: errorL1, config: configL1} = walletL1;
  const {account: accountL2, status: statusL2, error: errorL2, config: configL2} = walletL2;

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

  useEffect(() => {
    setWalletConfigL1(configL1);
  }, [configL1]);

  useEffect(() => {
    setWalletConfigL2(configL2);
  }, [configL2]);

  const connectWalletL1 = async walletConfig => {
    return walletL1.connect(walletConfig);
  };

  const resetWalletL1 = () => {
    return walletL1.reset();
  };

  const connectWalletL2 = async params => {
    return walletL2.connect(params);
  };

  const resetWalletL2 = () => {
    return walletL2.reset();
  };

  const calcAccountHash = (account1, account2) => {
    return hash.computeHashOnElements([
      parseToFelt(account1).toString(),
      parseToFelt(account2).toString()
    ]);
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
