import {useCallback} from 'react';

import {getEthBalance, getTokenBalance} from '../api/erc20';
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
    async () => await getTokenBalance(account, contract, false),
    [tokenAddresses, account]
  );
};

export const useEthereumTokenBalance = (tokenAddresses, account) => {
  const contract = useEthereumTokenContract(tokenAddresses);
  return useCallback(
    async () =>
      tokenAddresses
        ? await getTokenBalance(account, contract, true)
        : await getEthBalance(account),
    [tokenAddresses, account]
  );
};

export const useEthereumTokensBalances = (tokensAddresses, account) => {
  const contracts = useEthereumTokenContracts(tokensAddresses);
  return contracts.map(contract =>
    useCallback(
      async () =>
        contract ? await getTokenBalance(account, contract, true) : await getEthBalance(account),
      [tokensAddresses, account]
    )
  );
};

export const useStarknetTokensBalances = (tokensAddresses, account) => {
  const contracts = useStarknetTokenContracts(tokensAddresses);
  return contracts.map(contract =>
    useCallback(
      async () => await getTokenBalance(account, contract, false),
      [tokensAddresses, account]
    )
  );
};
