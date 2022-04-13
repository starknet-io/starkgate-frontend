import {useContext} from 'react';

import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
import {AppContext} from './app-context';

export const useApp = () => useContext(AppContext);

export const useTerms = () => {
  const {isAcceptTerms, acceptTerms} = useApp();

  return {isAcceptTerms, acceptTerms};
};

export const useLogin = () => {
  const {isConnected: isL1Connected} = useL1Wallet();
  const {isConnected: isL2Connected} = useL2Wallet();

  return {isLoggedIn: isL1Connected && isL2Connected};
};
