import {useCallback} from 'react';
import {uint256} from 'starknet';

import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {callContract, callStarknetContract} from '../utils/contract';
import {web3} from '../web3';
import {useTokenContract} from './useContract';

export const useTokenBalance = tokenAddresses => {
  const contract = useTokenContract(tokenAddresses);
  const {isEthereum} = useTransferData();

  return useCallback(
    async account => {
      if (isEthereum) {
        const balance = await callContract(contract, 'balanceOf', [account]);
        return Number(web3.utils.fromWei(balance));
      }
      const {balance} = await callStarknetContract(contract, 'balance_of', [{account}]);
      return uint256.uint256ToBN(balance).toNumber();
    },
    [isEthereum]
  );
};
