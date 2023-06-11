import {useCallback} from 'react';

import {useSelectedToken, useTransfer} from '@providers';

import {useL1TokenBalance} from './useTokenBalance';

export const useIsMaxTotalBalanceExceeded = () => {
  const selectedToken = useSelectedToken();
  const getTokenBridgeBalance = useL1TokenBalance(selectedToken?.bridgeAddress);
  const {isL1} = useTransfer();

  return useCallback(
    async (amount = 0) => {
      if (selectedToken && isL1) {
        const {maxTotalBalance} = selectedToken;
        const currentTotalBalance = await getTokenBridgeBalance(selectedToken);
        const exceeded = Number(maxTotalBalance) <= Number(currentTotalBalance) + Number(amount);
        return {
          maxTotalBalance,
          currentTotalBalance,
          exceeded
        };
      }
      return {exceeded: false};
    },
    [selectedToken, isL1, getTokenBridgeBalance]
  );
};
