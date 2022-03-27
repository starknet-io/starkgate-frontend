import {useCallback} from 'react';

import {balanceOf, ethBalanceOf} from '../api/erc20';
import {useTransfer} from '../providers/TransferProvider';
import utils from '../utils';
import {useL1TokenContract, useL2TokenContract} from './useContract';

export const useTokenBalance = account => {
  const getL2TokenBalance = useL2TokenBalance(account);
  const getL1TokenBalance = useL1TokenBalance(account);
  const {isL1} = useTransfer();
  return useCallback(
    tokenAddresses =>
      isL1 ? getL1TokenBalance(tokenAddresses) : getL2TokenBalance(tokenAddresses),
    [isL1, account, getL1TokenBalance, getL2TokenBalance]
  );
};

export const useL2TokenBalance = account => {
  const getContract = useL2TokenContract();
  return useCallback(
    async token => {
      const {tokenAddress, decimals} = token;
      return await balanceOf({account, decimals, contract: getContract(tokenAddress)}, false);
    },
    [account, getContract]
  );
};

export const useL1TokenBalance = account => {
  const getContract = useL1TokenContract();
  return useCallback(
    async token => {
      const {tokenAddress, decimals} = token;
      return utils.token.isEth(token)
        ? await ethBalanceOf(account)
        : await balanceOf({account, decimals, contract: getContract(tokenAddress)}, true);
    },
    [account, getContract]
  );
};
