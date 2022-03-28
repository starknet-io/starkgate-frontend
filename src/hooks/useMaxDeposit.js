import {useAsyncMemo} from 'use-async-memo';

import {maxDeposit} from '../api/bridge';
import {useTransfer} from '../providers/TransferProvider';
import {useTokenBridgeContract} from './useContract';

const cache = {};

export const useMaxDeposit = () => {
  const {symbol, isL1, selectedToken} = useTransfer();
  const getTokenBridgeContract = useTokenBridgeContract();

  const fetchMaxDeposit = async () => {
    const {decimals, bridgeAddress} = selectedToken;
    const contract = getTokenBridgeContract(bridgeAddress);
    return await maxDeposit({decimals, contract});
  };

  return useAsyncMemo(async () => {
    if (symbol && isL1) {
      if (!cache[symbol]) {
        const value = await fetchMaxDeposit();
        cache[symbol] = value;
        return value;
      }
      return cache[symbol];
    }
    return null;
  }, [symbol, isL1]);
};
