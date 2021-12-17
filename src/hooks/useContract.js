import {useMemo} from 'react';

import {ERC20_ABI, ERC20_BRIDGE_ABI, ETH_BRIDGE_ABI, MESSAGING_ABI} from '../abis/ethereum';
import {STARKNET_BRIDGE_ABI, STARKNET_ERC20_ABI} from '../abis/starknet';
import {useTransferData} from '../components/Features/Transfer/Transfer/Transfer.hooks';
import {ETH_BRIDGE_CONTRACT_ADDRESS, MESSAGING_CONTRACT_ADDRESS} from '../config/addresses';
import {useWallets} from '../providers/WalletsProvider/hooks';
import {eth_getContract, starknet_getContract} from '../utils/contract';

export const useContracts = (tokensAddresses, ABI, getContractHandler = eth_getContract) => {
  const {chainId} = useWallets();
  return useMemo(() => {
    return tokensAddresses.map(tokenAddresses => {
      if (tokenAddresses) {
        try {
          const address = tokenAddresses[chainId];
          if (!address) return null;
          return getContractHandler(address, ABI);
        } catch (ex) {
          return null;
        }
      }
      return null;
    });
  }, [tokensAddresses, ABI, chainId]);
};

export const useContract = (addresses, ABI, getContractHandler = eth_getContract) => {
  const {chainId} = useWallets();
  return useMemo(() => {
    try {
      let address = addresses[chainId];
      if (!address) return null;
      return getContractHandler(address, ABI);
    } catch (ex) {
      return null;
    }
  }, [addresses, ABI, chainId]);
};

export const useTokenContract = tokenAddresses => {
  const tokenContract = useEthereumTokenContract(tokenAddresses);
  const starknetTokenContract = useStarknetTokenContract(tokenAddresses);
  const {isEthereum} = useTransferData();
  return useMemo(() => (isEthereum ? tokenContract : starknetTokenContract), [isEthereum]);
};

export const useTokenBridgeContract = bridgeAddress => {
  const tokenBridgeContract = useEthereumTokenBridgeContract(bridgeAddress);
  const starknetTokenBridgeContract = useStarknetTokenBridgeContract(bridgeAddress);
  const {isEthereum} = useTransferData();
  return useMemo(
    () => (isEthereum ? tokenBridgeContract : starknetTokenBridgeContract),
    [isEthereum]
  );
};

export const useStarknetTokenContract = tokenAddresses =>
  useContract(tokenAddresses, STARKNET_ERC20_ABI, starknet_getContract);

export const useStarknetTokenContracts = tokensAddresses =>
  useContracts(tokensAddresses, STARKNET_ERC20_ABI, starknet_getContract);

export const useEthereumTokenContract = tokenAddresses => useContract(tokenAddresses, ERC20_ABI);

export const useEthereumTokenContracts = tokensAddresses =>
  useContracts(tokensAddresses, ERC20_ABI);

export const useEthBridgeContract = () => useContract(ETH_BRIDGE_CONTRACT_ADDRESS, ETH_BRIDGE_ABI);

export const useMessagingContract = () => useContract(MESSAGING_CONTRACT_ADDRESS, MESSAGING_ABI);

export const useStarknetTokenBridgeContract = bridgeAddress =>
  useContract(bridgeAddress, STARKNET_BRIDGE_ABI, starknet_getContract);

export const useEthereumTokenBridgeContract = bridgeAddress =>
  useContract(bridgeAddress, ERC20_BRIDGE_ABI);
