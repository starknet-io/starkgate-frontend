import {useCallback} from 'react';

import {getEthBalance, getTokenBalance} from '../api/erc20';
import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {useTokenContract} from './useContract';

export const useTokenBalance = tokenAddresses => {
  const contract = useTokenContract(tokenAddresses);
  const {isEthereum} = useTransferData();

  return useCallback(
    async account =>
      !tokenAddresses && isEthereum
        ? await getEthBalance(account)
        : await getTokenBalance(account, contract, isEthereum),
    [isEthereum]
  );
};
