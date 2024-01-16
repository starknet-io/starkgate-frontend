import {ethers} from 'ethers';
import {useCallback} from 'react';

import {useEnvs} from '@hooks';
import {useEthereumWallet} from '@providers';

export const useSendEthereumTransaction = () => {
  const {getEthereumProvider} = useEthereumWallet();
  const {ETHEREUM_GAS_MULTIPLIER} = useEnvs();

  return useCallback(
    async ({contract, method, transaction, args}) => {
      const provider = await getEthereumProvider();
      const populatedTransaction = await contract.populateTransaction[method](...args, transaction);
      // Estimate the gas required
      const estimatedGas = await provider.estimateGas(populatedTransaction);
      // Calculate the gas limit with the multiplier
      const gasLimit = estimatedGas
        .mul(ethers.BigNumber.from(Math.ceil(ETHEREUM_GAS_MULTIPLIER * 100)))
        .div(100);
      // Add the gas limit to the transaction object
      const tx = {
        ...transaction,
        gasLimit
      };
      // Send the transaction with the calculated gas limit
      return contract[method](...args, tx);
    },
    [getEthereumProvider, ETHEREUM_GAS_MULTIPLIER]
  );
};
