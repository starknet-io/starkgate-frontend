import {useContext} from 'react';

import {StarknetWalletContext} from './starknet-wallet-context';

export const useStarknetWallet = () => {
  return useContext(StarknetWalletContext);
};
