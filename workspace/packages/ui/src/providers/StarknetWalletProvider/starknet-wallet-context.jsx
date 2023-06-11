import {createContext} from 'react';

import {initialState} from './starknet-wallet-reducer';

export const StarknetWalletContext = createContext({
  ...initialState,
  connect: () => ({}),
  disconnect: () => ({})
});
