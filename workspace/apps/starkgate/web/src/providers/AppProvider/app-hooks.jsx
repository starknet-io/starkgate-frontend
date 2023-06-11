import {useContext} from 'react';

import {useL1Wallet, useL2Wallet} from '@providers';
import {isConnected} from '@starkware-webapps/enums';

import {AppContext} from './app-context';

export const useApp = () => useContext(AppContext);

export const useTerms = () => {
  const {isAcceptTerms, acceptTerms} = useApp();

  return {isAcceptTerms, acceptTerms};
};

export const useLogin = () => {
  const {status: statusL1, config: configL1} = useL1Wallet();
  const {status: statusL2, config: configL2} = useL2Wallet();

  return {
    isLoggedIn: isConnected(statusL1) && !!configL1 && isConnected(statusL2) && !!configL2
  };
};
