import {evaluate, getString} from '../../../../utils';

const {btn_txt, withdrawal_txt, deposit_txt, status_txt} = getString('modals.transactionSubmitted');

export const WITHDRAWAL_TXT = withdrawal_txt;
export const DEPOSIT_TXT = deposit_txt;
export const STATUS_TXT = status_txt;
export const BTN_TEXT = explorer => evaluate(btn_txt, {explorer});
