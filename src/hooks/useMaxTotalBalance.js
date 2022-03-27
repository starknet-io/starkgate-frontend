import {useAsyncMemo} from 'use-async-memo';

import {maxTotalBalance} from '../api/bridge';
import {useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {useTokenBridgeContract} from './useContract';

const cache = {};

export const useMaxTotalBalance = () => {
  const {symbol, isL1, selectedToken} = useTransferData();
  const getTokenBridgeContract = useTokenBridgeContract();

  const fetchMaxTotalBalance = async () => {
    const {decimals, bridgeAddress} = selectedToken;
    const contract = getTokenBridgeContract(bridgeAddress);
    return await maxTotalBalance({decimals, contract});
  };

  return useAsyncMemo(async () => {
    if (symbol && isL1) {
      if (!cache[symbol]) {
        const value = await fetchMaxTotalBalance();
        cache[symbol] = value;
        return value;
      }
      return cache[symbol];
    }
    return null;
  }, [symbol, isL1]);
};
