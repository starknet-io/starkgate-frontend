import {getStarknet} from '../libs';
import {WalletHandler} from './wallet-handler';

export class GetStarknetWallet extends WalletHandler {
  constructor(config) {
    super(config);
  }

  isInstalled() {
    const version = window.starknet?.version;
    return version && version !== 'uninstalled';
  }

  install() {
    return getStarknet().enable({showModal: true});
  }
}
