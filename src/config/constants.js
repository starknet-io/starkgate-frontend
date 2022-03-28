import {byChainId} from '../enums';
import utils from '../utils';

const constants = {
  LOCAL_STORAGE_TRANSFERS_KEY: 'STARKGATE_TRANSFERS',
  ETHERSCAN_URL: 'etherscan.io',
  VOYAGER_URL: 'voyager.online',
  LINKS: {
    ETHERSCAN: {
      text: 'etherscan',
      txUrl: (chainId, hash) =>
        utils.object.evaluate('{{url}}/tx/{{hash}}', {
          url: byChainId(chainId).blockExplorerUrl,
          hash
        }),
      accountUrl: (chainId, account) =>
        utils.object.evaluate('{{url}}/address/{{account}}', {
          url: byChainId(chainId).blockExplorerUrl,
          account
        })
    },
    VOYAGER: {
      text: 'voyager',
      txUrl: (chainId, hash) =>
        utils.object.evaluate('{{url}}/tx/{{hash}}', {
          url: byChainId(chainId).l2BlockExplorerUrl,
          hash
        }),
      accountUrl: (chainId, account) =>
        utils.object.evaluate('{{url}}/contract/{{account}}', {
          url: byChainId(chainId).l2BlockExplorerUrl,
          account
        })
    }
  },
  DISCORD_LINK_URL: '//discord.gg/MRjKBXtaDt'
};

export default constants;
