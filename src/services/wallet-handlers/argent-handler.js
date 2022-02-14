import {getStarknet} from '../../libs';

export class ArgentHandler {
  constructor(config) {
    this.config = config;
  }

  isInstalled() {
    return Boolean(window.starknet);
  }

  install() {
    return getStarknet({showModal: true});
  }
}
