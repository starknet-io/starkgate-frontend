import {
  getPropertyPath,
  isChrome,
  isFirefox,
  getBrowserName
} from '@starkware-industries/commons-js-utils';

import translations from '../config/translations';

export class WalletHandler {
  constructor(config) {
    this.config = config;
  }

  isBrowserSupported() {
    const isEdge = () => getBrowserName() === 'Edge';
    const isBrowserSupported = isChrome() || isFirefox() || isEdge();

    if (!isBrowserSupported) {
      throw new Error(getPropertyPath(translations, 'modals.login.unsupportedBrowserTxt'));
    }
    return true;
  }

  isInstalled() {
    return false;
  }

  install() {}
}
