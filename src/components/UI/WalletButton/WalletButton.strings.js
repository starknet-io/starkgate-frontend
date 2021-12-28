import {evaluate, getString} from '../../../utils';

export const BTN_TXT = address =>
  evaluate(getString('containers.header.wallet_btn_txt'), {address});
