import {getStarknet} from '../libs';

export class GetStarknetWallet {
  constructor(config) {
    this.config = config;
  }

  isInstalled() {
    const version = window.starknet?.version;
    return version && version !== 'uninstalled';
  }

  install() {
    return getStarknet().enable({showModal: true});
  }
}
