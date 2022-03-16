import {useCallback, useMemo} from 'react';

import {L1_ERC20_ABI, L1_ERC20_BRIDGE_ABI, L1_ETH_BRIDGE_ABI, L1_MESSAGING_ABI} from '../abis/l1';
import {L2_BRIDGE_ABI, L2_ERC20_ABI} from '../abis/l2';
import {useTransferData} from '../components/Features/Transfer/Transfer.hooks';
import {MESSAGING_CONTRACT_ADDRESS} from '../config/addresses';
import {NetworkType} from '../enums';
import {useL1Token} from '../providers/TokensProvider';
import {useL1Wallet, useWallets} from '../providers/WalletsProvider';
import blockchainUtils from '../utils/blockchain';

const cache = {};

export const useContract = (ABI, getContractHandler = blockchainUtils.ethereum.createContract) => {
  const {chainId} = useWallets();
  return useCallback(
    addresses => {
      try {
        const address = addresses[chainId];
        if (!address) {
          return null;
        }
        if (!cache[address]) {
          cache[address] = getContractHandler(address, ABI);
        }
        return cache[address];
      } catch (ex) {
        return null;
      }
    },
    [ABI, chainId, getContractHandler]
  );
};

export const useTokenContract = () => {
  const getL1TokenContract = useL1TokenContract();
  const getL2TokenContract = useL2TokenContract();
  const {isL1} = useTransferData();
  return useCallback(
    tokenAddresses =>
      isL1 ? getL1TokenContract(tokenAddresses) : getL2TokenContract(tokenAddresses),
    [isL1, getL2TokenContract, getL1TokenContract]
  );
};

export const useTokenBridgeContract = () => {
  const getL1TokenBridgeContract = useL1TokenBridgeContract();
  const getL2TokenBridgeContract = useL2TokenBridgeContract();
  const {isL1} = useTransferData();
  return useCallback(
    bridgeAddress =>
      isL1 ? getL1TokenBridgeContract(bridgeAddress) : getL2TokenBridgeContract(bridgeAddress),
    [isL1, getL1TokenBridgeContract, getL2TokenBridgeContract]
  );
};

export const useL2TokenContract = () => {
  const getContract = useContract(L2_ERC20_ABI, blockchainUtils.starknet.createContract);
  return useCallback(tokenAddresses => getContract(tokenAddresses), [getContract]);
};

export const useL1TokenContract = () => {
  const getContract = useContract(L1_ERC20_ABI);
  return useCallback(tokenAddresses => getContract(tokenAddresses), [getContract]);
};

export const useMessagingContract = () => {
  const getContract = useContract(L1_MESSAGING_ABI);
  return useMemo(() => getContract(MESSAGING_CONTRACT_ADDRESS), [getContract]);
};

export const useL2TokenBridgeContract = () => {
  const getContract = useContract(L2_BRIDGE_ABI, blockchainUtils.starknet.createContract);
  return useCallback(bridgeAddress => getContract(bridgeAddress), [getContract]);
};

export const useL1TokenBridgeContract = () => {
  const getTokenBridgeContract = useContract(L1_ERC20_BRIDGE_ABI);
  const getEthBridgeContract = useContract(L1_ETH_BRIDGE_ABI);
  const ethToken = useL1Token()(NetworkType.L1.symbol);
  const {chainId} = useL1Wallet();
  return useCallback(
    bridgeAddress =>
      bridgeAddress[chainId] === ethToken.bridgeAddress[chainId]
        ? getEthBridgeContract(bridgeAddress)
        : getTokenBridgeContract(bridgeAddress),
    [getTokenBridgeContract, getEthBridgeContract]
  );
};
