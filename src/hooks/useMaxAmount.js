import {useAsyncMemo} from 'use-async-memo';

import {maxDeposit} from '../api/bridge';
import {useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {useTokenBridgeContract} from './useContract';

const cache = {};

export const useMaxAmount = () => {
  const {symbol, isL1, selectedToken} = useTransferData();
  const getTokenBridgeContract = useTokenBridgeContract();

  const fetchMaxAmount = async () => {
    const {decimals, bridgeAddress} = selectedToken;
    const contract = getTokenBridgeContract(bridgeAddress);
    return await maxDeposit({decimals, contract});
  };

  return useAsyncMemo(async () => {
    if (symbol && isL1) {
      if (!cache[symbol]) {
        const value = await fetchMaxAmount();
        cache[symbol] = value;
        return value;
      }
      return cache[symbol];
    }
    return null;
  }, [symbol, isL1]);
};
