import {getStarknet} from '@starkware-industries/commons-js-libs';

import {WalletHandler} from './wallet-handler';

export class GetStarknetWallet extends WalletHandler {
  isInstalled() {
    const version = window.starknet?.version;
    return version && version !== 'uninstalled';
  }

  install() {
    if (this.isBrowserSupported()) {
      return getStarknet().enable({showModal: true});
    }
  }
}
