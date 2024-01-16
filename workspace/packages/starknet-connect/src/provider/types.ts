import {RpcProvider, constants} from 'starknet';

import {ProviderName} from '.';

export type ApiKeyProviderConfig = {
  name: ProviderName.ALCHEMY | ProviderName.BLAST | ProviderName.INFURA;
  apiKey: string;
};

export type NodeIdProviderConfig = {
  name: ProviderName.CHAINSTACK;
  nodeId: string;
  apiKey: string;
};

export type URLProviderConfig = {
  baseUrl: string;
};

export type ProviderConfig = ApiKeyProviderConfig | NodeIdProviderConfig | URLProviderConfig;

export type ProviderUrlMap = {
  [key in ProviderName]: (
    config: ApiKeyProviderConfig | NodeIdProviderConfig,
    network: string
  ) => string;
};

export type ProviderBundle = {
  provider: RpcProvider;
  isActive: boolean;
  retryDelayMultiplier: number;
};

export type ProvidersConfig = {
  chainId: constants.StarknetChainId;
  providers: ProviderConfig[];
};
