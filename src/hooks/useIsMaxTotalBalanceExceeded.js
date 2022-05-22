import {useCallback} from 'react';

import {useSelectedToken} from '../providers/TransferProvider';
import {useL1TokenContract} from './useContract';
import {useMaxTotalBalance} from './useMaxTotalBalance';
import {useL1TokenBalance} from './useTokenBalance';

export const useIsMaxTotalBalanceExceeded = () => {
  const selectedToken = useSelectedToken();
  const maxTotalBalance = useMaxTotalBalance();
  const getTokenContract = useL1TokenContract();
  const getTokenBridgeBalance = useL1TokenBalance(selectedToken?.bridgeAddress);

  return useCallback(
    async (amount = 0) => {
      if (maxTotalBalance) {
        const tokenBridgeBalance = await getTokenBridgeBalance(selectedToken);
        return maxTotalBalance < tokenBridgeBalance + Number(amount);
      }
    },
    [getTokenContract, selectedToken, maxTotalBalance, getTokenBridgeBalance]
  );
};
