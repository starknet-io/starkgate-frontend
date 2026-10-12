import {useCallback} from 'react';

import {addDecimalStrings, compareDecimalStrings} from '@starkware-webapps/utils';
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

        // Exact decimal-string addition instead of `Number(a) + Number(b)`. Summing two
        // token balances through IEEE-754 doubles loses precision past ~15 significant
        // digits, so the bridge could be reported as full while it still has headroom —
        // or, worse, the capacity check could be bypassed because a sum slightly below the
        // cap rounds down to the cap.
        const projectedTotal = addDecimalStrings(currentTotalBalance, amount);

        // `exceeded` is true when the projected total has reached the cap.
        const comparison = compareDecimalStrings(projectedTotal, String(maxTotalBalance));
        const exceeded = comparison === null ? false : comparison >= 0;

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
