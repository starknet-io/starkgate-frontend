import {capitalize, evaluate, getTranslation} from '../../../utils';

export const CHAIN_TXT = chainName =>
  capitalize(evaluate(getTranslation('containers.header.chain_txt'), {chainName}));
