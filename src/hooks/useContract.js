import {useCallback, useMemo} from 'react';

import {L1_ERC20_ABI, L1_ERC20_BRIDGE_ABI, L1_ETH_BRIDGE_ABI, L1_MESSAGING_ABI} from '../abis/l1';
import {L2_BRIDGE_ABI, L2_ERC20_ABI} from '../abis/l2';
import envs from '../config/envs';
import {NetworkType} from '../enums';
import {useL1Token} from '../providers/TokensProvider';
import {useTransfer} from '../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../providers/WalletsProvider';
import utils from '../utils';

const {starknetContractAddress} = envs;

const cache = {};

export const useContract = (ABI, chainId, getContractHandler) => {
  return useCallback(
    addresses => {
      try {
        let address;
        if (typeof addresses === 'string') {
          address = addresses;
        } else if (typeof addresses === 'object') {
          address = addresses[chainId];
        } else {
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
    [ABI, getContractHandler]
  );
};

export const useTokenContract = () => {
  const getL1TokenContract = useL1TokenContract();
  const getL2TokenContract = useL2TokenContract();
  const {isL1} = useTransfer();

  return useCallback(
    tokenAddresses =>
      isL1 ? getL1TokenContract(tokenAddresses) : getL2TokenContract(tokenAddresses),
    [isL1, getL2TokenContract, getL1TokenContract]
  );
};

export const useTokenBridgeContract = () => {
  const getL1TokenBridgeContract = useL1TokenBridgeContract();
  const getL2TokenBridgeContract = useL2TokenBridgeContract();
  const {isL1} = useTransfer();

  return useCallback(
    bridgeAddress =>
      isL1 ? getL1TokenBridgeContract(bridgeAddress) : getL2TokenBridgeContract(bridgeAddress),
    [isL1, getL1TokenBridgeContract, getL2TokenBridgeContract]
  );
};

export const useL2TokenContract = () => {
  const {chainId} = useL2Wallet();
  const getContract = useContract(L2_ERC20_ABI, chainId, utils.blockchain.starknet.createContract);

  return useCallback(tokenAddresses => getContract(tokenAddresses), [getContract, chainId]);
};

export const useL1TokenContract = () => {
  const {chainId} = useL1Wallet();
  const getContract = useContract(L1_ERC20_ABI, chainId, utils.blockchain.ethereum.createContract);

  return useCallback(tokenAddresses => getContract(tokenAddresses), [getContract, chainId]);
};

export const useStarknetContract = () => {
  const {chainId} = useL1Wallet();
  const getContract = useContract(
    L1_MESSAGING_ABI,
    chainId,
    utils.blockchain.ethereum.createContract
  );

  return useMemo(() => getContract(starknetContractAddress), [getContract, chainId]);
};

export const useL2TokenBridgeContract = () => {
  const {chainId} = useL2Wallet();
  const getContract = useContract(L2_BRIDGE_ABI, chainId, utils.blockchain.starknet.createContract);

  return useCallback(bridgeAddress => getContract(bridgeAddress), [getContract, chainId]);
};

export const useL1TokenBridgeContract = () => {
  const {chainId} = useL1Wallet();
  const getTokenBridgeContract = useContract(
    L1_ERC20_BRIDGE_ABI,
    chainId,
    utils.blockchain.ethereum.createContract
  );
  const getEthBridgeContract = useContract(
    L1_ETH_BRIDGE_ABI,
    chainId,
    utils.blockchain.ethereum.createContract
  );
  const ethToken = useL1Token()(NetworkType.L1.symbol);

  return useCallback(
    bridgeAddress =>
      bridgeAddress[chainId] === ethToken.bridgeAddress[chainId]
        ? getEthBridgeContract(bridgeAddress)
        : getTokenBridgeContract(bridgeAddress),
    [getTokenBridgeContract, getEthBridgeContract, chainId, ethToken]
  );
};
