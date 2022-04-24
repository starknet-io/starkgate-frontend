import {getStarknet} from '../libs';

export class ArgentX {
  constructor(config) {
    this.config = config;
  }

  isInstalled() {
    const version = window.starknet?.version;
    return version && version !== 'uninstalled';
  }

  async install() {
    try {
      const starknet = getStarknet();
      return await starknet.enable({showModal: true});
      // eslint-disable-next-line no-empty
    } catch {}
  }
}
