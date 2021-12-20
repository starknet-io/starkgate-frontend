import {createContext} from 'react';

export const TokensContext = createContext({
  tokens: [],
  updateTokens: () => {}
});
