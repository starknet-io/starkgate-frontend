import {localStorageAcceptTermsKey} from '../../config/envs';
import {getItem} from '../../utils';

export const actions = {
  SET_ACCEPT_TERMS: 'App/SET_ACCEPT_TERMS',
  SET_IS_LOGGED_IN: 'App/SET_IS_LOGGED_IN'
};

export const initialState = {
  isAcceptTerms: getItem(localStorageAcceptTermsKey),
  isLoggedIn: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_ACCEPT_TERMS: {
      return {
        ...state,
        isAcceptTerms: true
      };
    }

    case actions.SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    }

    default:
      return state;
  }
};
