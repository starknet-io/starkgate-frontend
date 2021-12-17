import {useCallback} from 'react';

import {eth_ethBalanceOf, balanceOf} from '../api/erc20';
import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {
  useEthereumTokenContract,
  useEthereumTokenContracts,
  useStarknetTokenContract,
  useStarknetTokenContracts
} from './useContract';

export const useTokenBalance = (tokenAddresses, account) => {
  const getStarknetBalanceCallback = useStarknetTokenBalance(tokenAddresses, account);
  const getEthereumBalanceCallback = useEthereumTokenBalance(tokenAddresses, account);
  const {isEthereum} = useTransferData();
  return useCallback(
    () => (isEthereum ? getEthereumBalanceCallback() : getStarknetBalanceCallback()),
    [isEthereum, tokenAddresses, account]
  );
};

export const useStarknetTokenBalance = (tokenAddresses, account) => {
  const contract = useStarknetTokenContract(tokenAddresses);
  return useCallback(
    async () => await balanceOf(account, contract, false),
    [tokenAddresses, account]
  );
};

export const useEthereumTokenBalance = (tokenAddresses, account) => {
  const contract = useEthereumTokenContract(tokenAddresses);
  return useCallback(
    async () =>
      tokenAddresses ? await balanceOf(account, contract, true) : await eth_ethBalanceOf(account),
    [tokenAddresses, account]
  );
};

export const useEthereumTokensBalances = (tokensAddresses, account) => {
  const contracts = useEthereumTokenContracts(tokensAddresses);
  return contracts.map(contract =>
    useCallback(
      async () =>
        contract ? await balanceOf(account, contract, true) : await eth_ethBalanceOf(account),
      [tokensAddresses, account]
    )
  );
};

export const useStarknetTokensBalances = (tokensAddresses, account) => {
  const contracts = useStarknetTokenContracts(tokensAddresses);
  return contracts.map(contract =>
    useCallback(async () => await balanceOf(account, contract, false), [tokensAddresses, account])
  );
};
