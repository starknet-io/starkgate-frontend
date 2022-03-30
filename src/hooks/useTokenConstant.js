import {useAsyncMemo} from 'use-async-memo';

import {maxDeposit, maxTotalBalance} from '../api/bridge';
import {useTransfer} from '../providers/TransferProvider';
import {useTokenBridgeContract} from './useContract';

const cache = {};

export const useMaxDeposit = () => {
  return useTokenConstant('maxDeposit', maxDeposit);
};

export const useMaxTotalBalance = () => {
  return useTokenConstant('maxTotalBalance', maxTotalBalance);
};

const useTokenConstant = (methodName, methodHandler) => {
  const {symbol, isL1, selectedToken} = useTransfer();
  const getTokenBridgeContract = useTokenBridgeContract();

  const fetchTokenConstant = () => {
    const {decimals, bridgeAddress} = selectedToken;
    const contract = getTokenBridgeContract(bridgeAddress);
    return methodHandler({decimals, contract});
  };

  return useAsyncMemo(async () => {
    if (symbol && isL1) {
      cache[methodName] = cache[methodName] || {};
      if (!cache[methodName][symbol]) {
        const value = await fetchTokenConstant();
        cache[methodName][symbol] = value;
        return value;
      }
      return cache[symbol];
    }
    return null;
  }, [symbol, isL1, selectedToken, methodHandler, methodName]);
};
