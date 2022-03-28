import utils from '../../../utils';

export const CHAIN_TXT = chainName =>
  utils.string.capitalize(
    utils.object.evaluate(utils.getTranslation('containers.header.chain_txt'), {chainName})
  );

export const TAB_DISCORD_TXT = utils.getTranslation('containers.header.tab_discord_txt');

export const TAB_FAQ = utils.getTranslation('containers.header.tab_faq');
