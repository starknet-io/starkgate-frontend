import {useCallback} from 'react';

import {useTransfer} from '../providers/TransferProvider';
import {useTokenBridgeContract} from './useContract';

export const useCachedTokenConstant = () => {
  const getTokenBridgeContract = useTokenBridgeContract();
  const {symbol, selectedToken} = useTransfer();

  return useCallback(
    async (cache, fn, logger) => {
      if (!cache[symbol]) {
        logger.log(`Trying to fetch ${symbol} value to cache`);
        const {decimals, bridgeAddress} = selectedToken;
        const contract = getTokenBridgeContract(bridgeAddress);
        const value = await fn({decimals, contract});
        logger.log(`Setting ${symbol} value to cache - ${value}`, cache);
        cache[symbol] = value;
        return value;
      }
      return cache[symbol];
    },
    [getTokenBridgeContract, symbol]
  );
};
