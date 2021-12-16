import {createContext} from 'react';

import {initialState} from './reducer';

export const TokensContext = createContext({
  ...initialState,
  fetchEthereumBalances: () => {},
  fetchStarknetBalances: () => {}
});
