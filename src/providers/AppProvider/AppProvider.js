import {setStorageItem} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React, {useReducer} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {useEnvsWrapper} from '../../hooks';
import {AppContext} from './app-context';
import {actions, initialState, reducer} from './app-reducer';

export const AppProvider = ({children}) => {
  const {LOCAL_STORAGE_ACCEPT_TERMS_KEY} = useEnvsWrapper();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const isScrollActive = ['/terms', '/faq'].includes(pathname);

  const navigateToRoute = route => {
    pathname !== route && navigate(route);
  };

  const login = () => {
    dispatch({
      type: actions.SET_IS_LOGGED_IN,
      isLoggedIn: true
    });
  };

  const logout = () => {
    dispatch({
      type: actions.SET_IS_LOGGED_IN,
      isLoggedIn: false
    });
  };

  const acceptTerms = () => {
    setStorageItem(LOCAL_STORAGE_ACCEPT_TERMS_KEY, true);
    dispatch({
      type: actions.SET_ACCEPT_TERMS
    });
  };

  const value = {
    ...state,
    isScrollActive,
    navigateToRoute,
    acceptTerms,
    login,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
