import strings from '../../../config/strings.json';
import {evaluate} from '../../../utils';

const {
  login: {title_txt, subtitle_txt, download_txt, modal_txt}
} = strings;

export const TITLE_TXT = title_txt;

export const DOWNLOAD_TEXT = download_txt;

export const SUBTITLE_TXT = networkName => evaluate(subtitle_txt, {networkName});

export const MODAL_TXT = walletName => evaluate(modal_txt, {walletName});
