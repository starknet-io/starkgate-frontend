import {constants} from 'starknet';

import {ProviderName} from './enums';
import {ApiKeyProviderConfig, NodeIdProviderConfig, ProviderUrlMap} from './types';

export const ProviderToNetworkMap = {
  [ProviderName.ALCHEMY]: {
    [constants.StarknetChainId.SN_MAIN]: 'starknet-mainnet',
    [constants.StarknetChainId.SN_GOERLI]: 'starknet-goerli',
    [constants.StarknetChainId.SN_SEPOLIA]: 'starknet-sepolia'
  },
  [ProviderName.BLAST]: {
    [constants.StarknetChainId.SN_MAIN]: 'starknet-mainnet',
    [constants.StarknetChainId.SN_GOERLI]: 'starknet-testnet',
    [constants.StarknetChainId.SN_SEPOLIA]: 'starknet-sepolia'
  },
  [ProviderName.CHAINSTACK]: {
    [constants.StarknetChainId.SN_MAIN]: '',
    [constants.StarknetChainId.SN_GOERLI]: '',
    [constants.StarknetChainId.SN_SEPOLIA]: ''
  },
  [ProviderName.INFURA]: {
    [constants.StarknetChainId.SN_MAIN]: 'mainnet',
    [constants.StarknetChainId.SN_GOERLI]: 'goerli',
    [constants.StarknetChainId.SN_SEPOLIA]: 'sepolia'
  }
};

const ProviderToUrlMap: ProviderUrlMap = {
  [ProviderName.ALCHEMY]: (config: ApiKeyProviderConfig | NodeIdProviderConfig, network: string) =>
    `https://${network}.g.alchemy.com/v2/${config.apiKey}`,
  [ProviderName.BLAST]: (config: ApiKeyProviderConfig | NodeIdProviderConfig, network: string) =>
    `https://${network}.blastapi.io/${config.apiKey}/rpc/v0.5`,
  [ProviderName.CHAINSTACK]: (config: ApiKeyProviderConfig | NodeIdProviderConfig) =>
    `https://nd-${(config as NodeIdProviderConfig).nodeId}.p2pify.com/${config.apiKey}/rpc/v0.5`,
  [ProviderName.INFURA]: (config: ApiKeyProviderConfig | NodeIdProviderConfig, network: string) =>
    `https://${network}.infura.io/v3/${config.apiKey}`
};

export const buildProviderUrl = (
  chainId: constants.StarknetChainId,
  config: ApiKeyProviderConfig | NodeIdProviderConfig
) => {
  const networkName = toProviderNetwork(chainId, config.name);
  return ProviderToUrlMap[config.name](config, networkName);
};

export const toProviderNetwork = (
  chainId: constants.StarknetChainId,
  name: ProviderName
): string => {
  const networkName = ProviderToNetworkMap[name][chainId];

  if (networkName === null) {
    throw new Error(`Chain ${chainId} is not supported for ${name}.`);
  }

  return networkName;
};
