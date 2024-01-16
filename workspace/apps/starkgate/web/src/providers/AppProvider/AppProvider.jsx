import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useReducer} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {blockExplorers} from '@config/block-explorers';
import {useConstants} from '@hooks';
import {NetworkType} from '@starkware-webapps/enums';
import {setStorageItem} from '@starkware-webapps/utils-browser';

import {AppContext} from './app-context';
import {actions, initialState, reducer} from './app-reducer';

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const isScrollActive = ['/terms', '/faq'].includes(pathname);
  const {BLOCK_EXPLORER_STORAGE_KEY} = useConstants();

  useEffect(() => {
    const {blockExplorer: blockExplorerId} = state;
    const blockExplorer = blockExplorers[NetworkType.L2][blockExplorerId];
    if (!blockExplorer) {
      const blockExplorerIds = Object.keys(blockExplorers[NetworkType.L2]);
      const randomBlockExplorer =
        blockExplorerIds[Math.floor(Math.random() * blockExplorerIds.length)];
      selectBlockExplorer(randomBlockExplorer);
    }
  }, []);

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

  const selectBlockExplorer = useCallback(blockExplorer => {
    setStorageItem(BLOCK_EXPLORER_STORAGE_KEY, blockExplorer);
    dispatch({
      type: actions.SET_BLOCK_EXPLORER,
      blockExplorer
    });
  }, []);

  const value = {
    ...state,
    isScrollActive,
    navigateToRoute,
    login,
    logout,
    selectBlockExplorer
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
