import {useMemo} from 'react';

import Wallets from '../config/wallets.js';
import {useIsL1} from '../providers/TransferProvider';
import {GetStarknetWallet, MetaMask} from '../wallets';

const SUPPORTED_L1_HANDLERS_REGISTRY = {
  metamask: MetaMask
};

const SUPPORTED_L2_HANDLERS_REGISTRY = {
  gsw: GetStarknetWallet
};

export const useWalletHandlerProvider = () => {
  const [isL1] = useIsL1();

  return useMemo(() => {
    const walletsConfig = isL1 ? Wallets.L1 : Wallets.L2;
    const registry = isL1 ? SUPPORTED_L1_HANDLERS_REGISTRY : SUPPORTED_L2_HANDLERS_REGISTRY;
    const handlers = [];
    walletsConfig.forEach(walletConfig => {
      const {id} = walletConfig;
      const WalletHandler = registry[id];
      if (WalletHandler) {
        handlers.push(new WalletHandler(walletConfig));
      }
    });
    return handlers;
  }, [isL1]);
};
