import {useMemo} from 'react';

import BuyProviders from '../config/buy';
import {useEnvs} from './useEnvs';

export const useBuyProviders = () => {
  const {supportedBuyProviders} = useEnvs();
  return useMemo(
    () => BuyProviders.filter(p => supportedBuyProviders.includes(p.id)),
    [BuyProviders]
  );
};
