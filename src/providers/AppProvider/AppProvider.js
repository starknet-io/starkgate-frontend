import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {useEnvs} from '../../hooks';
import {setStorageItem} from '../../utils';
import {AppContext} from './app-context';
import {actions, initialState, reducer} from './app-reducer';

export const AppProvider = ({children}) => {
  const {localStorageAcceptTermsKey} = useEnvs();
  const [state, dispatch] = useReducer(reducer, initialState);

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
    setStorageItem(localStorageAcceptTermsKey, true);
    dispatch({
      type: actions.SET_ACCEPT_TERMS
    });
  };

  const value = {
    ...state,
    acceptTerms,
    login,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
