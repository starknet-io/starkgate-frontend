import {useCallback} from 'react';

import {useSelectedToken, useTransfer} from '../providers/TransferProvider';
import {useL1TokenContract} from './useContract';
import {useMaxTotalBalance} from './useMaxTotalBalance';
import {useL1TokenBalance} from './useTokenBalance';

export const useIsMaxTotalBalanceExceeded = () => {
  const selectedToken = useSelectedToken();
  const maxTotalBalance = useMaxTotalBalance();
  const getTokenContract = useL1TokenContract();
  const getTokenBridgeBalance = useL1TokenBalance(selectedToken?.bridgeAddress);
  const {isL1} = useTransfer();

  return useCallback(
    async (amount = 0) => {
      if (maxTotalBalance && isL1) {
        const tokenBridgeBalance = await getTokenBridgeBalance(selectedToken);
        return maxTotalBalance < tokenBridgeBalance + Number(amount);
      }
    },
    [getTokenContract, selectedToken, maxTotalBalance, isL1, getTokenBridgeBalance]
  );
};
