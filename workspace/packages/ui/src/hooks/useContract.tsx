import {useCallback} from 'react';
import {Contract as StarknetContract} from 'starknet';
import {Contract as EthereumContract} from 'web3-eth-contract';
import {AbiItem} from 'web3-utils';

export const cache: {[address: string]: EthereumContract | StarknetContract} = {};

export const useContract = (
  abi: AbiItem[],
  createContractHandler: (
    contractAddress: string,
    abi: AbiItem[]
  ) => EthereumContract | StarknetContract
) => {
  return useCallback(
    (contractAddress: string) => {
      if (!cache[contractAddress]) {
        cache[contractAddress] = createContractHandler(contractAddress, abi);
      }
      return cache[contractAddress];
    },
    [abi, createContractHandler]
  );
};
