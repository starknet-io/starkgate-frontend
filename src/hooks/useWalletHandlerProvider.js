import {useEffect, useState} from 'react';

import wallets from '../config/wallets.json';
import {ArgentHandler, MetaMaskHandler} from '../services';

const SUPPORTED_HANDLERS_REGISTRY = {
  metamask: MetaMaskHandler,
  argent: ArgentHandler
};

export const useWalletHandlerProvider = () => {
  const [handlers, setHandlers] = useState([]);

  useEffect(() => {
    const walletHandlers = [];
    wallets.forEach(walletConfig => {
      const {id} = walletConfig;
      const WalletHandler = SUPPORTED_HANDLERS_REGISTRY[id];
      if (WalletHandler) {
        walletHandlers.push(new WalletHandler(walletConfig));
      }
    });
    setHandlers(walletHandlers);
  }, []);

  const getWalletHandlers = type => {
    return type ? handlers.filter(walletHandler => walletHandler.config.type === type) : handlers;
  };

  return {
    getWalletHandlers
  };
};
