import {getPropertyPath, isChrome, isFirefox} from '@starkware-industries/commons-js-utils';

import translations from '../config/translations';

export class WalletHandler {
  constructor(config) {
    this.config = config;
  }

  isBrowserSupported() {
    const isBrowserSupported = isChrome() || isFirefox();
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
