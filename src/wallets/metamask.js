import MetaMaskOnboarding from '@metamask/onboarding';

export class MetaMask {
  constructor(config) {
    this.config = config;
    this.onboarding = new MetaMaskOnboarding();
  }

  isInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }

  install() {
    return this.onboarding.startOnboarding();
  }
}
