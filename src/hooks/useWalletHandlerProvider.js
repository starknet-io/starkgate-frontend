import {useCallback, useEffect, useState} from 'react';

import WalletsConfig from '../config/wallets.js';
import {GetStarknetWallet, MetaMask} from '../wallets';

const SUPPORTED_HANDLERS_REGISTRY = {
  metamask: MetaMask,
  gsw: GetStarknetWallet
};

export const useWalletHandlerProvider = () => {
  const [handlers, setHandlers] = useState([]);

  useEffect(() => {
    const walletHandlers = [];
    WalletsConfig.forEach(walletConfig => {
      const {id} = walletConfig;
      const WalletHandler = SUPPORTED_HANDLERS_REGISTRY[id];
      if (WalletHandler) {
        walletHandlers.push(new WalletHandler(walletConfig));
      }
    });
    setHandlers(walletHandlers);
  }, []);

  return useCallback(
    type => {
      return type ? handlers.filter(walletHandler => walletHandler.config.type === type) : handlers;
    },
    [handlers]
  );
};
