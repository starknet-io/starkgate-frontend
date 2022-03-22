import utils from '../../../utils';

export const CHAIN_TXT = chainName =>
  utils.string.capitalize(
    utils.object.evaluate(utils.getTranslation('containers.header.chain_txt'), {chainName})
  );
