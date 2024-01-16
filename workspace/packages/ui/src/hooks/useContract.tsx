import {useCallback} from 'react';

export const cache: {[address: string]: any} = {};

export const useContract = (
  abi: Record<string, any>,
  createContractHandler: (contractAddress: string, abi: Record<string, any>) => any
) => {
  return useCallback(
    async (contractAddress: string) => {
      if (!cache[contractAddress]) {
        cache[contractAddress] = await createContractHandler(contractAddress, abi);
      }
      return cache[contractAddress];
    },
    [abi, createContractHandler]
  );
};
