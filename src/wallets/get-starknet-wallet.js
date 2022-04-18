import {getStarknet} from '../libs';

export class GetStarknetWallet {
  constructor(config) {
    this.config = config;
  }

  isInstalled() {
    return Boolean(window.starknet);
  }

  install() {
    return getStarknet().enable({showModal: true});
  }
}
