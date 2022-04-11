import {useContext} from 'react';

import {AppContext} from './app-context';

export const useApp = () => useContext(AppContext);

export const useTerms = () => {
  const {isAcceptTerms, acceptTerms} = useApp();

  return {isAcceptTerms, acceptTerms};
};

export const useLogin = () => {
  const {isLoggedIn, login, logout} = useApp();

  return {isLoggedIn, login, logout};
};
