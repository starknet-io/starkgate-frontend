import {useCallback} from 'react';

import {balanceOf, eth_ethBalanceOf} from '../api/erc20';
import {useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {useEthereumTokenContract, useStarknetTokenContract} from './useContract';

export const useTokenBalance = account => {
  const getStarknetTokenBalance = useStarknetTokenBalance(account);
  const getEthereumTokenBalance = useEthereumTokenBalance(account);
  const {isEthereum} = useTransferData();
  return useCallback(
    tokenAddresses =>
      isEthereum
        ? getEthereumTokenBalance(tokenAddresses)
        : getStarknetTokenBalance(tokenAddresses),
    [isEthereum, getEthereumTokenBalance, getStarknetTokenBalance]
  );
};

export const useStarknetTokenBalance = account => {
  const getContract = useStarknetTokenContract();
  return useCallback(
    async tokenAddresses => await balanceOf(account, getContract(tokenAddresses), false),
    [account, getContract]
  );
};

export const useEthereumTokenBalance = account => {
  const getContract = useEthereumTokenContract();
  return useCallback(
    async tokenAddresses =>
      tokenAddresses
        ? await balanceOf(account, getContract(tokenAddresses), true)
        : await eth_ethBalanceOf(account),
    [account, getContract]
  );
};
