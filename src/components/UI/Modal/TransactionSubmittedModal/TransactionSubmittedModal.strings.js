import {evaluate, getString} from '../../../../utils';

const {btn_txt, body_txt} = getString('modals.transactionSubmitted');

export const BODY_TXT_PARTS = body_txt;
export const BTN_TEXT = explorer => evaluate(btn_txt, {explorer});
