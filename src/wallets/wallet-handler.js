import strings from '../config/strings';
import {getPropertyPath, isChrome, isFirefox} from '../utils';

export class WalletHandler {
  constructor(config) {
    this.config = config;
  }

  isBrowserSupported() {
    const isBrowserSupported = isChrome() || isFirefox();
    if (!isBrowserSupported) {
      throw new Error(getPropertyPath(strings, 'menus.login.unsupportedBrowserTxt'));
    }
    return true;
  }

  isInstalled() {
    return false;
  }

  install() {}
}
