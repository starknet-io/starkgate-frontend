import {evaluate, getTranslation} from '../../../utils';

export const TITLE_TXT = network => evaluate(getTranslation('menus.account.title_txt'), {network});
