import {useCallback, useMemo} from 'react';

import {ERC20_ABI, ERC20_BRIDGE_ABI, ETH_BRIDGE_ABI, MESSAGING_ABI} from '../abis/ethereum';
import {STARKNET_BRIDGE_ABI, STARKNET_ERC20_ABI} from '../abis/starknet';
import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {ETH_BRIDGE_CONTRACT_ADDRESS, MESSAGING_CONTRACT_ADDRESS} from '../config/addresses';
import {useWallets} from '../providers/WalletsProvider/hooks';
import {eth_getContract, starknet_getContract} from '../utils/contract';

export const useContracts = (ABI, getContractHandler = eth_getContract) => {
  const getContract = useContract(ABI, getContractHandler);
  return useCallback(
    tokensAddresses =>
      tokensAddresses.map(tokenAddresses => {
        if (tokenAddresses) {
          return getContract(tokenAddresses);
        }
        return null;
      }),
    [ABI]
  );
};

export const useContract = (ABI, getContractHandler = eth_getContract) => {
  const {chainId} = useWallets();
  return useCallback(
    addresses => {
      try {
        let address = addresses[chainId];
        if (!address) return null;
        return getContractHandler(address, ABI);
      } catch (ex) {
        return null;
      }
    },
    [ABI, chainId]
  );
};

export const useTokenContract = () => {
  const getTokenContract = useEthereumTokenContract();
  const getStarknetTokenContract = useStarknetTokenContract();
  const {isEthereum} = useTransferData();
  return useCallback(
    tokenAddresses =>
      isEthereum ? getTokenContract(tokenAddresses) : getStarknetTokenContract(tokenAddresses),
    [isEthereum]
  );
};

export const useTokenBridgeContract = () => {
  const getTokenBridgeContract = useEthereumTokenBridgeContract();
  const getStarknetTokenBridgeContract = useStarknetTokenBridgeContract();
  const {isEthereum} = useTransferData();
  return useCallback(
    bridgeAddress =>
      isEthereum
        ? getTokenBridgeContract(bridgeAddress)
        : getStarknetTokenBridgeContract(bridgeAddress),
    [isEthereum]
  );
};

export const useStarknetTokenContract = () => {
  const getContract = useContract(STARKNET_ERC20_ABI, starknet_getContract);
  return useCallback(tokenAddresses => getContract(tokenAddresses), []);
};
export const useStarknetTokenContracts = () => {
  const getContracts = useContracts(STARKNET_ERC20_ABI, starknet_getContract);
  return useCallback(tokensAddresses => getContracts(tokensAddresses), []);
};
export const useEthereumTokenContract = () => {
  const getContract = useContract(ERC20_ABI);
  return useCallback(tokenAddresses => getContract(tokenAddresses), []);
};

export const useEthereumTokenContracts = () => {
  const getContracts = useContracts(ERC20_ABI);
  return useCallback(tokensAddresses => getContracts(tokensAddresses), []);
};

export const useEthBridgeContract = () => {
  const getContract = useContract(ETH_BRIDGE_ABI);
  return useMemo(() => getContract(ETH_BRIDGE_CONTRACT_ADDRESS), []);
};

export const useMessagingContract = () => {
  const getContract = useContract(MESSAGING_ABI);
  return useMemo(() => getContract(MESSAGING_CONTRACT_ADDRESS), []);
};

export const useStarknetTokenBridgeContract = () => {
  const getContract = useContract(STARKNET_BRIDGE_ABI, starknet_getContract);
  return useCallback(bridgeAddress => getContract(bridgeAddress), []);
};

export const useEthereumTokenBridgeContract = () => {
  const getContract = useContract(ERC20_BRIDGE_ABI);
  return useCallback(bridgeAddress => getContract(bridgeAddress), []);
};
