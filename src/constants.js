import {byChainId} from './enums';
import {evaluate} from './utils';

export const LOCAL_STORAGE_TRANSFERS_KEY = 'STARKNET_BRIDGE_TRANSFERS';
export const STARKNET_INVOKE_TX_PREFIX = '115923154332517';
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
        url: byChainId(chainId).starknetBlockExplorerUrl,
        hash
      }),
    accountUrl: (chainId, account) =>
      evaluate('{{url}}/contract/{{account}}', {
        url: byChainId(chainId).starknetBlockExplorerUrl,
        account
      })
  }
};
