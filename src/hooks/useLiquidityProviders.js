import {useMemo} from 'react';

import LiquidityProviders from '../config/liquidity';
import {useEnvs} from './useEnvs';

export const useLiquidityProviders = () => {
  const {supportedLiquidityProviders, supportedL1ChainId} = useEnvs();

  return useMemo(
    () =>
      LiquidityProviders.filter(p => supportedLiquidityProviders.includes(p.id)).map(p => ({
        ...p,
        link: p.link[supportedL1ChainId]
      })),
    [LiquidityProviders]
  );
};
