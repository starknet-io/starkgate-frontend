import {createContext} from 'react';

import {initialState} from './app-reducer';

export const AppContext = createContext({
  ...initialState,
  navigateToRoute: () => {},
  acceptTerms: () => {},
  login: () => {},
  logout: () => {}
});
