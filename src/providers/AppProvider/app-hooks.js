import {useContext} from 'react';

import {WalletStatus} from '../../enums';
import {useL1Wallet, useL2Wallet} from '../WalletsProvider';
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
    isLoggedIn:
      statusL1 === WalletStatus.CONNECTED &&
      !!configL1 &&
      statusL2 === WalletStatus.CONNECTED &&
      !!configL2
  };
};
