import {useEffect} from 'react';

import {useConstants, useEnvs, useWalletHandlersL1, useWalletHandlersL2} from '@hooks';
import {getCookie} from '@starkware-webapps/utils-browser';

export const useAutoConnect = () => {
  const {CONNECTED_L1_WALLET_ID_COOKIE_NAME, CONNECTED_L2_WALLET_ID_COOKIE_NAME} = useConstants();
  const {AUTO_CONNECT} = useEnvs();
  const walletHandlersL1 = useWalletHandlersL1();
  const walletHandlersL2 = useWalletHandlersL2();

  const autoConnectEthereum = () => {
    const doConnect = () => {
      setTimeout(() => {
        // Do not auto connect if the user locked the wallet
        if (ethereum.selectedAddress) {
          const connectedL1WalletIdCookie = getCookie(CONNECTED_L1_WALLET_ID_COOKIE_NAME);
          const walletHandler = walletHandlersL1.find(({id}) => id === connectedL1WalletIdCookie);
          walletHandler && walletHandler.connect();
        }
      });
    };
    const ethereum = window?.ethereum;
    if (ethereum) {
      if (ethereum.selectedAddress) {
        doConnect();
      } else {
        ethereum.once('connect', doConnect);
      }
    }
  };

  const autoConnectStarknet = () => {
    const connectedL2WalletIdCookie = getCookie(CONNECTED_L2_WALLET_ID_COOKIE_NAME);
    const walletHandler = walletHandlersL2.find(({id}) => id === connectedL2WalletIdCookie);
    walletHandler && walletHandler.connect({autoConnect: true});
  };

  useEffect(() => {
    if (AUTO_CONNECT) {
      autoConnectEthereum();
      autoConnectStarknet();
    }
  }, []);
};
