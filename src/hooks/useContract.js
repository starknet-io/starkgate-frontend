import {useCallback, useMemo} from 'react';

import {ERC20_ABI, ERC20_BRIDGE_ABI, ETH_BRIDGE_ABI, MESSAGING_ABI} from '../abis/ethereum';
import {STARKNET_BRIDGE_ABI, STARKNET_ERC20_ABI} from '../abis/starknet';
import {useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {MESSAGING_CONTRACT_ADDRESS} from '../config/addresses';
import {NetworkType} from '../enums';
import {useEthereumToken} from '../providers/TokensProvider';
import {useEthereumWallet, useWallets} from '../providers/WalletsProvider';
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
    [ABI, getContract]
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
    [ABI, chainId, getContractHandler]
  );
};

export const useTokenContract = () => {
  const getTokenContract = useEthereumTokenContract();
  const getStarknetTokenContract = useStarknetTokenContract();
  const {isEthereum} = useTransferData();
  return useCallback(
    tokenAddresses =>
      isEthereum ? getTokenContract(tokenAddresses) : getStarknetTokenContract(tokenAddresses),
    [isEthereum, getStarknetTokenContract, getTokenContract]
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
    [isEthereum, getTokenBridgeContract, getStarknetTokenBridgeContract]
  );
};

export const useStarknetTokenContract = () => {
  const getContract = useContract(STARKNET_ERC20_ABI, starknet_getContract);
  return useCallback(tokenAddresses => getContract(tokenAddresses), [getContract]);
};
export const useStarknetTokenContracts = () => {
  const getContracts = useContracts(STARKNET_ERC20_ABI, starknet_getContract);
  return useCallback(tokensAddresses => getContracts(tokensAddresses), [getContracts]);
};
export const useEthereumTokenContract = () => {
  const getContract = useContract(ERC20_ABI);
  return useCallback(tokenAddresses => getContract(tokenAddresses), [getContract]);
};

export const useEthereumTokenContracts = () => {
  const getContracts = useContracts(ERC20_ABI);
  return useCallback(tokensAddresses => getContracts(tokensAddresses), [getContracts]);
};

export const useMessagingContract = () => {
  const getContract = useContract(MESSAGING_ABI);
  return useMemo(() => getContract(MESSAGING_CONTRACT_ADDRESS), [getContract]);
};

export const useStarknetTokenBridgeContract = () => {
  const getContract = useContract(STARKNET_BRIDGE_ABI, starknet_getContract);
  return useCallback(bridgeAddress => getContract(bridgeAddress), [getContract]);
};

export const useEthereumTokenBridgeContract = () => {
  const getTokenBridgeContract = useContract(ERC20_BRIDGE_ABI);
  const getEthBridgeContract = useContract(ETH_BRIDGE_ABI);
  const ethToken = useEthereumToken()(NetworkType.ETHEREUM.symbol);
  const {chainId} = useEthereumWallet();
  return useCallback(
    bridgeAddress =>
      bridgeAddress[chainId] === ethToken.bridgeAddress[chainId]
        ? getEthBridgeContract(bridgeAddress)
        : getTokenBridgeContract(bridgeAddress),
    [getTokenBridgeContract, getEthBridgeContract]
  );
};
