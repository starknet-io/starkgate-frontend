import utils from '../../../utils';

const {title_txt, subtitle_txt, download_txt, unsupported_browser_txt, modal_txt} =
  utils.getTranslation('menus.login');

export const TITLE_TXT = title_txt;
export const DOWNLOAD_TEXT = download_txt;
export const UNSUPPORTED_BROWSER_TXT = unsupported_browser_txt;
export const SUBTITLE_TXT = networkName => utils.object.evaluate(subtitle_txt, {networkName});
export const MODAL_TXT1 = walletName => utils.object.evaluate(modal_txt[0], {walletName});
export const MODAL_TXT2 = walletName => utils.object.evaluate(modal_txt[1], {walletName});
export const MODAL_TXT3 = modal_txt[2];
