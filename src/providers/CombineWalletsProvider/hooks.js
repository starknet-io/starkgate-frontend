import {useCallback, useContext} from 'react';

import {useTransferData} from '../../components/Features/Transfer/Transfer/Transfer.hooks';
import {CombineWalletsContext} from './context';

export const useCombineWallets = () => {
  const combineWallets = useContext(CombineWalletsContext);
  const {isEthereum} = useTransferData();

  const getActiveWallet = () =>
    isEthereum ? combineWallets.ethereumWallet : combineWallets.starknetWallet;

  const connectWallet = useCallback(walletConfig => combineWallets.connectWallet(walletConfig), []);

  const resetWallet = useCallback(() => combineWallets.resetWallet(), []);

  const swapWallets = useCallback(() => combineWallets.swapWallets(), []);

  return {
    ...getActiveWallet(),
    connectWallet,
    resetWallet,
    swapWallets
  };
};

export const useEthereumWallet = () => {
  const combineWallets = useContext(CombineWalletsContext);

  return {
    ...combineWallets.ethereumWallet
  };
};

export const useStarknetWallet = () => {
  const combineWallets = useContext(CombineWalletsContext);

  return {
    ...combineWallets.starknetWallet
  };
};
