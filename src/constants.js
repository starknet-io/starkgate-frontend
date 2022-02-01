import {byChainId} from './enums';
import {evaluate} from './utils';

export const LOCAL_STORAGE_TRANSFERS_KEY = 'STARKGATE_TRANSFERS';
export const ETHERSCAN_URL = 'etherscan.io';
export const VOYAGER_URL = 'voyager.online';
export const LINKS = {
  ETHERSCAN: {
    text: 'etherscan',
    txUrl: (chainId, hash) =>
      evaluate('{{url}}/tx/{{hash}}', {
        url: byChainId(chainId).blockExplorerUrl,
        hash
      }),
    accountUrl: (chainId, account) =>
      evaluate('{{url}}/address/{{account}}', {
        url: byChainId(chainId).blockExplorerUrl,
        account
      })
  },
  VOYAGER: {
    text: 'voyager',
    txUrl: (chainId, hash) =>
      evaluate('{{url}}/tx/{{hash}}', {
        url: byChainId(chainId).l2BlockExplorerUrl,
        hash
      }),
    accountUrl: (chainId, account) =>
      evaluate('{{url}}/contract/{{account}}', {
        url: byChainId(chainId).l2BlockExplorerUrl,
        account
      })
  }
};
