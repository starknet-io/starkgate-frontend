import utils from '../../../utils';

export const CHAIN_TXT = chainName =>
  utils.string.capitalize(
    utils.object.evaluate(utils.getTranslation('containers.header.chain_txt'), {chainName})
  );

export const TAB_DISCORD = utils.getTranslation('containers.header.tab_discord_txt');
