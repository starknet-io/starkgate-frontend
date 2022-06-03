import {useMemo} from 'react';

import Wallets from '../config/wallets.js';
import {NetworkType} from '../enums';
import {GetStarknetWallet, MetaMask} from '../wallets';

const configMap = {
  [NetworkType.L1.name]: {
    wallets: Wallets.L1,
    registry: {
      metamask: MetaMask
    }
  },
  [NetworkType.L2.name]: {
    wallets: Wallets.L2,
    registry: {
      gsw: GetStarknetWallet
    }
  }
};

export const useWalletHandlerProvider = network => {
  return useMemo(() => {
    const {wallets, registry} = configMap[network];
    return wallets.map(walletConfig => {
      const {id} = walletConfig;
      const WalletHandler = registry[id];
      if (WalletHandler) {
        return new WalletHandler(walletConfig);
      }
    });
  }, [network]);
};
