import {constants} from 'starknet';

import {assert} from '@starkware-webapps/utils';

import {NetworkChainIdMap, StarknetConnectConfig} from './types';

export const NetworkToChainIdMap: NetworkChainIdMap = {
  main: constants.StarknetChainId.SN_MAIN,
  goerli: constants.StarknetChainId.SN_GOERLI
};

export const getChainId = (starknet: StarknetConnectConfig): constants.StarknetChainId => {
  if ('chainId' in starknet) {
    return starknet.chainId;
  }
  assert.defined(starknet.network, 'network');

  const chainId = NetworkToChainIdMap[starknet.network];

  if (!chainId) {
    throw new Error('Unsupported Network.');
  }

  return chainId;
};
