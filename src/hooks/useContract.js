import {useCallback, useMemo} from 'react';

import {
  L1_ERC20_ABI,
  L1_ERC20_BRIDGE_ABI,
  ORACLE_AUTH_ABI,
  L1_ETH_BRIDGE_ABI,
  L1_MESSAGING_ABI
} from '../abis/l1';
import {L2_BRIDGE_ABI, L2_ERC20_ABI, L2_DAI_GATEWAY_ABI} from '../abis/l2';
import {NetworkType} from '../enums';
import {useL1Token} from '../providers/TokensProvider';
import {useTransfer} from '../providers/TransferProvider';
import {createL1Contract, createL2Contract} from '../utils';
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
  const getContract = useContract(L2_ERC20_ABI, createL2Contract);

  return useCallback(tokenAddress => getContract(tokenAddress), [getContract]);
};

export const useL1TokenContract = () => {
  const getContract = useContract(L1_ERC20_ABI, createL1Contract);

  return useCallback(tokenAddress => getContract(tokenAddress), [getContract]);
};

export const useStarknetContract = () => {
  const {starknetContractAddress} = useEnvs();
  const getContract = useContract(L1_MESSAGING_ABI, createL1Contract);

  return useMemo(() => getContract(starknetContractAddress), [getContract]);
};

export const useL2TokenBridgeContract = () => {
  const getContract = useContract(L2_BRIDGE_ABI, createL2Contract);

  return useCallback(bridgeAddress => getContract(bridgeAddress), [getContract]);
};

export const useL1TokenBridgeContract = () => {
  const getTokenBridgeContract = useContract(L1_ERC20_BRIDGE_ABI, createL1Contract);
  const getEthBridgeContract = useContract(L1_ETH_BRIDGE_ABI, createL1Contract);
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

export const useL2TokenGatewayContract = () => {
  const getContract = useContract(L2_DAI_GATEWAY_ABI, createL2Contract);

  return useCallback(gatewayAddress => getContract(gatewayAddress), [getContract]);
};

export const useOracleAuthContract = () => {
  const getContract = useContract(ORACLE_AUTH_ABI, createL1Contract);

  return useCallback(oracleAuthAddress => getContract(oracleAuthAddress), [getContract]);
};
