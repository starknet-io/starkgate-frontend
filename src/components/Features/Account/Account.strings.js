import strings from '../../../config/strings.json';
import {evaluate} from '../../../utils';

const {
  account: {title_txt}
} = strings;

export const TITLE_TXT = network => evaluate(title_txt, {network});
