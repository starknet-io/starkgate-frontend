import {useCallback} from 'react';

import {balanceOf, l1_ethBalanceOf} from '../api/erc20';
import {useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {useL1TokenContract, useL2TokenContract} from './useContract';

export const useTokenBalance = account => {
  const getL2TokenBalance = useL2TokenBalance(account);
  const getL1TokenBalance = useL1TokenBalance(account);
  const {isL1} = useTransferData();
  return useCallback(
    tokenAddresses =>
      isL1 ? getL1TokenBalance(tokenAddresses) : getL2TokenBalance(tokenAddresses),
    [isL1, account, getL1TokenBalance, getL2TokenBalance]
  );
};

export const useL2TokenBalance = account => {
  const getContract = useL2TokenContract();
  return useCallback(
    async tokenAddresses =>
      await balanceOf({account, contract: getContract(tokenAddresses)}, false),
    [account, getContract]
  );
};

export const useL1TokenBalance = account => {
  const getContract = useL1TokenContract();
  return useCallback(
    async tokenAddresses =>
      tokenAddresses
        ? await balanceOf({account, contract: getContract(tokenAddresses)}, true)
        : await l1_ethBalanceOf(account),
    [account, getContract]
  );
};
