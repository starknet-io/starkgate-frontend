import {createContext} from 'react';

import {initialState} from './tokens-reducer';

export const TokensContext = createContext({
  ...initialState,
  fetchEthereumBalances: () => {},
  fetchStarknetBalances: () => {}
});
