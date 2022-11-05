import {createContext} from 'react';

import {initialState} from './app-reducer';

export const AppContext = createContext({
  ...initialState,
  isScrollActive: false,
  navigateToRoute: () => {},
  acceptTerms: () => {},
  login: () => {},
  logout: () => {}
});
