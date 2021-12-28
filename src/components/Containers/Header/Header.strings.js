import {capitalize, evaluate, getString} from '../../../utils';

export const CHAIN_TXT = chainName =>
  capitalize(evaluate(getString('containers.header.chain_txt'), {chainName}));
