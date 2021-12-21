import strings from '../../../config/strings.json';
import {evaluate} from '../../../utils';

const {
  transactionSubmittedModal: {btn_txt, body_txt}
} = strings;

export const BODY_TXT_PARTS = body_txt;
export const BTN_TEXT = explorer => evaluate(btn_txt, {explorer});
