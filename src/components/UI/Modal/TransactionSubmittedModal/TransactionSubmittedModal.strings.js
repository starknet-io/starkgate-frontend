import {evaluate, getString} from '../../../../utils';

const {btn_txt, transfer_to_l1_txt, complete_transfer_to_l1_txt, transfer_to_l2_txt, status_txt} =
  getString('modals.transactionSubmitted');

export const COMPLETE_TRANSFER_TO_L1_TXT = complete_transfer_to_l1_txt;
export const TRANSFER_TO_L1_TXT = transfer_to_l1_txt;
export const TRANSFER_TO_L2_TXT = transfer_to_l2_txt;
export const STATUS_TXT = status_txt;
export const BTN_TEXT = explorer => evaluate(btn_txt, {explorer});
