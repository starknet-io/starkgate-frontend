import strings from '../../../config/strings.json';
import {capitalize, evaluate} from '../../../utils';

const {
  header: {chain_txt}
} = strings;

export const CHAIN_TXT = chainName => capitalize(evaluate(chain_txt, {chainName}));
