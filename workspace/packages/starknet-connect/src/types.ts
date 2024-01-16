import {constants} from 'starknet';

import {ProviderConfig, URLProviderConfig} from './provider';

export type NetworkChainIdMap = {
  [key in StarknetNetworkEnvironment]: constants.StarknetChainId;
};

export type AccountParams = {
  address: string;
  privateKey: string;
  version?: '0' | '1';
};

export type StarknetNetworkEnvironment = 'main' | 'goerli';

export type StarknetConnectConfig =
  | {
      network: StarknetNetworkEnvironment;
      providers: ProviderConfig[];
    }
  | {
      chainId: constants.StarknetChainId;
      providers: URLProviderConfig[];
    };
