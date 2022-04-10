import {createContext} from 'react';

import {initialState} from './app-reducer';

export const AppContext = createContext({
  ...initialState,
  acceptTerms: () => {},
  login: () => {},
  logout: () => {}
});
