import {useCallback} from 'react';

import {useSelectedToken, useTransfer} from '@providers';
import {isDai} from '@utils';

import {useL1TokenBalance} from './useTokenBalance';

export const useIsMaxTotalBalanceExceeded = () => {
  const {isL1} = useTransfer();
  const selectedToken = useSelectedToken();
  const getTokenBridgeBalance = useL1TokenBalance(
    isDai(selectedToken?.symbol) ? selectedToken?.escrowAddress : selectedToken?.bridgeAddress
  );

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
