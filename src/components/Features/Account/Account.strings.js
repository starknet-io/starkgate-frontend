import utils from '../../../utils';

export const TITLE_TXT = network =>
  utils.object.evaluate(utils.getTranslation('menus.account.title_txt'), {network});
