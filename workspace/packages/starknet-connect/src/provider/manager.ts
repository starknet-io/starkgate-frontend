import {LibraryError, RpcProvider} from 'starknet';

import {ProviderBundle, ProvidersConfig} from './types';
import {buildProviderUrl} from './utils';

export class ProviderManager {
  private static readonly INITIAL_RETRY_MULTIPLIER = 1;
  private static readonly BASE_RETRY_DELAY = 2000;
  private static readonly BACKOFF_EXPONENT = 2;

  private constructor(private readonly bundles: ProviderBundle[]) {}

  public static create(config: ProvidersConfig) {
    const {chainId, providers} = config;

    if (providers.length === 0) {
      throw new Error('No providers passed.');
    }

    const bundles = providers.map(providerConfig => {
      const nodeUrl =
        'baseUrl' in providerConfig
          ? providerConfig.baseUrl
          : buildProviderUrl(chainId, providerConfig);

      const provider = new RpcProvider({nodeUrl, chainId});

      return {
        provider,
        isActive: true,
        retryDelayMultiplier: ProviderManager.INITIAL_RETRY_MULTIPLIER
      };
    });

    return new ProviderManager(bundles);
  }

  public async call<T>(cb: (provider: RpcProvider) => Promise<T>): Promise<T> {
    for (const bundle of this.bundles) {
      if (!bundle.isActive) {
        continue;
      }

      try {
        const result = await cb(bundle.provider);
        this.resetBundle(bundle);
        return result;
      } catch (error) {
        this.handleProviderError(bundle, error);
      }
    }

    throw new Error('No available providers to handle the request.');
  }

  private resetBundle(bundle: ProviderBundle) {
    bundle.retryDelayMultiplier = ProviderManager.INITIAL_RETRY_MULTIPLIER;
    bundle.isActive = true;
  }

  private handleProviderError(bundle: ProviderBundle, error: unknown) {
    if (error instanceof LibraryError) {
      this.resetBundle(bundle);
      throw error;
    }

    if (bundle.isActive) {
      this.deactivateProvider(bundle);
    }
  }

  private deactivateProvider(bundle: ProviderBundle) {
    bundle.isActive = false;

    setTimeout(
      () => this.resetBundle(bundle),
      bundle.retryDelayMultiplier * ProviderManager.BASE_RETRY_DELAY
    );

    bundle.retryDelayMultiplier *= ProviderManager.BACKOFF_EXPONENT;
  }
}
