import {NetworkType} from '@starkware-commons-js/enums';
import {useMemo} from 'react';

import Wallets from '../config/wallets.js';
import {GetStarknetWallet, MetaMask} from '../wallets';
import {WalletHandler} from '../wallets/wallet-handler';

const configMap = {
  [NetworkType.L1]: {
    wallets: Wallets.L1,
    registry: {
      metamask: MetaMask
    }
  },
  [NetworkType.L2]: {
    wallets: Wallets.L2,
    registry: {
      gsw: GetStarknetWallet
    }
  }
};

export const useWalletHandlerProvider = network => {
  return useMemo(() => {
    const {wallets, registry} = configMap[network];
    return wallets
      .map(walletConfig => {
        const {id} = walletConfig;
        const WalletHandler = registry[id];
        if (WalletHandler) {
          return new WalletHandler(walletConfig);
        }
        return null;
      })
      .filter(walletHandler => walletHandler instanceof WalletHandler);
  }, [network]);
};
