import MetaMaskOnboarding from '@metamask/onboarding';

import {WalletHandler} from './wallet-handler';

export class MetaMask extends WalletHandler {
  constructor(config) {
    super(config);
    this.onboarding = new MetaMaskOnboarding();
  }

  isInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }

  install() {
    if (this.isBrowserSupported()) {
      return this.onboarding.startOnboarding();
    }
  }
}
