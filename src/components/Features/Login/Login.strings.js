import {evaluate, getTranslation} from '../../../utils';

const {title_txt, subtitle_txt, download_txt, modal_txt} = getTranslation('menus.login');

export const TITLE_TXT = title_txt;
export const DOWNLOAD_TEXT = download_txt;
export const SUBTITLE_TXT = networkName => evaluate(subtitle_txt, {networkName});
export const MODAL_TXT = walletName => evaluate(modal_txt, {walletName});
