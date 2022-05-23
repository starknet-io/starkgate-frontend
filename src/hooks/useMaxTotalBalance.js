import {useAsyncMemo} from 'use-async-memo';

import {maxTotalBalance} from '../api/bridge';
import {useTransfer} from '../providers/TransferProvider';
import {useCachedTokenConstant} from './useCachedTokenConstant';
import {useLogger} from './useLogger';

const cache = {};

export const useMaxTotalBalance = () => {
  const logger = useLogger('useMaxTotalBalance');
  const getValueFromCache = useCachedTokenConstant();
  const {symbol, isL1} = useTransfer();

  return useAsyncMemo(async () => {
    if (symbol && isL1) {
      return await getValueFromCache(cache, maxTotalBalance, logger);
    }
    return null;
  }, [symbol, isL1]);
};
