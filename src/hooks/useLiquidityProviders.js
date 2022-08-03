import {useMemo} from 'react';

import LiquidityProviders from '../config/liquidity';
import {useEnvs} from './useEnvs';

export const useLiquidityProviders = () => {
  const {SUPPORTED_LIQUIDITY_PROVIDERS, SUPPORTED_L1_CHAIN_ID} = useEnvs();

  return useMemo(
    () =>
      LiquidityProviders.filter(p => SUPPORTED_LIQUIDITY_PROVIDERS.includes(p.id)).map(p => ({
        ...p,
        link: p.link[supportedL1ChainId]
      })),
    [LiquidityProviders]
  );
};
