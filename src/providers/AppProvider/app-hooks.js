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
  const {status: l1Status, config: l1Config} = useL1Wallet();
  const {status: l2Status, config: l2Config} = useL2Wallet();

  return {
    isLoggedIn:
      l1Status === WalletStatus.CONNECTED &&
      !!l1Config &&
      l2Status === WalletStatus.CONNECTED &&
      !!l2Config
  };
};
