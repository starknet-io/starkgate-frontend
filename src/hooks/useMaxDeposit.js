import {useAsyncMemo} from 'use-async-memo';

import {maxDeposit} from '../api/bridge';
import {useTransfer} from '../providers/TransferProvider';
import {useCachedTokenConstant} from './useCachedTokenConstant';
import {useLogger} from './useLogger';

const cache = {};

export const useMaxDeposit = () => {
  const logger = useLogger('useMaxDeposit');
  const getValueFromCache = useCachedTokenConstant();
  const {symbol, isL1} = useTransfer();

  return useAsyncMemo(async () => {
    if (symbol && isL1) {
      return await getValueFromCache(cache, maxDeposit, logger);
    }
    return null;
  }, [symbol, isL1]);
};
