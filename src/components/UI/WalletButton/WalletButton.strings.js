import utils from '../../../utils';

export const BTN_TXT = address =>
  utils.object.evaluate(utils.getTranslation('containers.header.wallet_btn_txt'), {address});
