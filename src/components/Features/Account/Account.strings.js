import {evaluate, getString} from '../../../utils';

export const TITLE_TXT = network => evaluate(getString('menus.account.title_txt'), {network});
