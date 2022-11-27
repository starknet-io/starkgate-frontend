import {
  getPropertyPath,
  isChrome,
  isFirefox,
  getBrowserName
} from '@starkware-industries/commons-js-utils';

import strings from '../config/strings';

export class WalletHandler {
  constructor(config) {
    this.config = config;
  }

  isBrowserSupported() {
    const isEdge = () => getBrowserName() === 'Edge';
    const isBrowserSupported = isChrome() || isFirefox() || isEdge();

    if (!isBrowserSupported) {
      throw new Error(getPropertyPath(strings, 'modals.login.unsupportedBrowserTxt'));
    }
    return true;
  }

  isInstalled() {
    return false;
  }

  install() {}
}
