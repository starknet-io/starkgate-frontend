import {evaluate, getTranslation} from '../../../utils';

export const BTN_TXT = address =>
  evaluate(getTranslation('containers.header.wallet_btn_txt'), {address});
