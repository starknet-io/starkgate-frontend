import strings from '../../../config/strings.json';
import {evaluate} from '../../../utils';

const {
  walletButton: {btn_txt}
} = strings;

export const BTN_TXT = address => evaluate(btn_txt, {address});
