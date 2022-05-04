import {useCallback, useMemo} from 'react';

import {L1_ERC20_ABI, L1_ERC20_BRIDGE_ABI, L1_ETH_BRIDGE_ABI, L1_MESSAGING_ABI} from '../abis/l1';
import {L2_BRIDGE_ABI, L2_ERC20_ABI} from '../abis/l2';
import {NetworkType} from '../enums';
import {useL1Token} from '../providers/TokensProvider';
import {useTransfer} from '../providers/TransferProvider';
import utils from '../utils';
import {useEnvs} from './useEnvs';

const cache = {};

export const useContract = (abi, getContractHandler) => {
  return useCallback(
    address => {
      if (!cache[address]) {
        cache[address] = getContractHandler(address, abi);
      }
      return cache[address];
    },
    [abi, getContractHandler]
  );
};

export const useTokenContract = () => {
  const getL1TokenContract = useL1TokenContract();
  const getL2TokenContract = useL2TokenContract();
  const {isL1} = useTransfer();

  return useCallback(
    tokenAddress => {
      return isL1 ? getL1TokenContract(tokenAddress) : getL2TokenContract(tokenAddress);
    },
    [isL1, getL2TokenContract, getL1TokenContract]
  );
};

export const useTokenBridgeContract = () => {
  const getL1TokenBridgeContract = useL1TokenBridgeContract();
  const getL2TokenBridgeContract = useL2TokenBridgeContract();
  const {isL1} = useTransfer();

  return useCallback(
    bridgeAddress => {
      return isL1
        ? getL1TokenBridgeContract(bridgeAddress)
        : getL2TokenBridgeContract(bridgeAddress);
    },
    [isL1, getL1TokenBridgeContract, getL2TokenBridgeContract]
  );
};

export const useL2TokenContract = () => {
  const getContract = useContract(L2_ERC20_ABI, utils.blockchain.starknet.createContract);

  return useCallback(tokenAddress => getContract(tokenAddress), [getContract]);
};

export const useL1TokenContract = () => {
  const getContract = useContract(L1_ERC20_ABI, utils.blockchain.ethereum.createContract);

  return useCallback(tokenAddress => getContract(tokenAddress), [getContract]);
};

export const useStarknetContract = () => {
  const {starknetContractAddress} = useEnvs();
  const getContract = useContract(L1_MESSAGING_ABI, utils.blockchain.ethereum.createContract);

  return useMemo(() => getContract(starknetContractAddress), [getContract]);
};

export const useL2TokenBridgeContract = () => {
  const getContract = useContract(L2_BRIDGE_ABI, utils.blockchain.starknet.createContract);

  return useCallback(bridgeAddress => getContract(bridgeAddress), [getContract]);
};

export const useL1TokenBridgeContract = () => {
  const getTokenBridgeContract = useContract(
    L1_ERC20_BRIDGE_ABI,
    utils.blockchain.ethereum.createContract
  );
  const getEthBridgeContract = useContract(
    L1_ETH_BRIDGE_ABI,
    utils.blockchain.ethereum.createContract
  );
  const ethToken = useL1Token()(NetworkType.L1.symbol);

  return useCallback(
    bridgeAddress => {
      return bridgeAddress === ethToken.bridgeAddress
        ? getEthBridgeContract(bridgeAddress)
        : getTokenBridgeContract(bridgeAddress);
    },
    [getTokenBridgeContract, getEthBridgeContract, ethToken]
  );
};
