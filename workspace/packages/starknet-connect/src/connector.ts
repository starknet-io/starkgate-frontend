import {Account, constants} from 'starknet';

import {ProviderName, Provider as RpcProvider} from './provider';
import {AccountParams, StarknetConnectConfig} from './types';
import {getChainId} from './utils';

export class StarknetConnect {
  public static readonly Provider = ProviderName;

  private constructor(
    private readonly chainId: constants.StarknetChainId,
    private readonly provider: RpcProvider
  ) {}

  public static create(config: StarknetConnectConfig) {
    const {providers} = config;

    const chainId = getChainId(config);
    const provider = RpcProvider.create({chainId, providers});

    return new StarknetConnect(chainId, provider);
  }

  getProvider() {
    return this.provider;
  }

  createAccount({address, privateKey, version}: AccountParams) {
    return new Account(this.getProvider(), address, privateKey, version);
  }
}
