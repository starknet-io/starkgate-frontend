import {createContext} from 'react';

import {initialState} from './app-reducer';

export const AppContext = createContext({
  ...initialState,
  isScrollActive: false,
  navigateToRoute: () => ({}),
  login: () => ({}),
  logout: () => ({}),
  selectBlockExplorer: blockExplorer => blockExplorer
});
