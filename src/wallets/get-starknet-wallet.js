import {getStarknet} from '@starkware-industries/commons-js-libs/get-starknet';

import {WalletHandler} from './wallet-handler';

export class GetStarknetWallet extends WalletHandler {
  isInstalled() {
    const version = window.starknet?.version || window.starknet_braavos?.version;
    return version && version !== 'uninstalled';
  }

  install() {
    if (this.isBrowserSupported()) {
      return getStarknet().enable({
        showModal: true
      });
    }
  }
}
