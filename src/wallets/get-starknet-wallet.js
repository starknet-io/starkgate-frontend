import {getStarknet} from '@starkware-industries/commons-js-libs';

import {WalletHandler} from './wallet-handler';

export class GetStarknetWallet extends WalletHandler {
  isInstalled() {
    const version = window.starknet?.version;
    return version && version !== 'uninstalled';
  }

  install() {
    return getStarknet().enable({showModal: true});
  }
}
