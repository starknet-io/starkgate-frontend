import {useCallback} from 'react';

import {useTransfer} from '@providers';
import {isEth} from '@utils';

import {useTokenContractAPI} from './useTokenContractAPI';

export const useTokenBalance = account => {
  const getL2TokenBalance = useL2TokenBalance(account);
  const getL1TokenBalance = useL1TokenBalance(account);
  const {isL1} = useTransfer();

  return useCallback(
    tokenAddresses => {
      return isL1 ? getL1TokenBalance(tokenAddresses) : getL2TokenBalance(tokenAddresses);
    },
    [isL1, getL1TokenBalance, getL2TokenBalance]
  );
};

export const useL2TokenBalance = account => {
  const {balanceOfL2} = useTokenContractAPI();

  return useCallback(
    async token => {
      return await balanceOfL2({account, token});
    },
    [account, balanceOfL2]
  );
};

export const useL1TokenBalance = account => {
  const {balanceOfL1, balanceOfEth} = useTokenContractAPI();

  return useCallback(
    async token => {
      const {symbol} = token;
      return isEth(symbol)
        ? await balanceOfEth(account)
        : await balanceOfL1({
            account,
            token
          });
    },
    [account, balanceOfL1, balanceOfEth]
  );
};
