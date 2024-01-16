import {BLOCK_EXPLORER_STORAGE_KEY} from '@config/constants';
import {getStorageItem} from '@starkware-webapps/utils-browser';

export const actions = {
  SET_ACCEPT_TERMS: 'App/SET_ACCEPT_TERMS',
  SET_IS_LOGGED_IN: 'App/SET_IS_LOGGED_IN',
  SET_BLOCK_EXPLORER: 'App/SET_BLOCK_EXPLORER'
};

export const initialState = {
  blockExplorer: getStorageItem(BLOCK_EXPLORER_STORAGE_KEY),
  isLoggedIn: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    }

    case actions.SET_BLOCK_EXPLORER: {
      return {
        ...state,
        blockExplorer: action.blockExplorer
      };
    }

    default:
      return state;
  }
};
