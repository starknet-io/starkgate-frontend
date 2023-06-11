import {getStarknet} from 'get-starknet';
import {useCallback, useMemo} from 'react';
import {Contract} from 'starknet';

import {
  L1_DAI_BRIDGE_ABI,
  L1_ERC20_ABI,
  L1_ERC20_BRIDGE_ABI,
  L1_ETH_BRIDGE_ABI,
  L1_MESSAGING_ABI,
  L1_TELEPORT_ORACLE_AUTH_ABI,
  L2_BRIDGE_ABI,
  L2_DAI_TELEPORT_GATEWAY,
  L2_ERC20_ABI
} from '@abis';
import {useEnvs, useWeb3} from '@hooks';
import {useL1Wallet, useL2Wallet, useTransfer} from '@providers';
import {Tokens} from '@starkgate/shared';
import {useContract} from '@starkware-webapps/ui';

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

const useCreateContractL1 = () => {
  const web3 = useWeb3();
  return useCallback((address, abi) => web3 && new web3.eth.Contract(abi, address), [web3]);
};

const useCreateContractL2 = () => {
  return useCallback(
    (address, abi) => getStarknet().provider && new Contract(abi, address, getStarknet().provider),
    [getStarknet().provider]
  );
};

export const useL2EthTokenContract = () => {
  const {chainId} = useL2Wallet();
  const createContractL2 = useCreateContractL2();
  const getContract = useContract(L2_ERC20_ABI, createContractL2);
  const ethTokenAddress = Tokens.L2.ETH.tokenAddress[chainId];

  return useMemo(() => getContract(ethTokenAddress), [ethTokenAddress]);
};

export const useL2TokenContract = () => {
  const createContractL2 = useCreateContractL2();
  const getContract = useContract(L2_ERC20_ABI, createContractL2);

  return useCallback(tokenAddress => getContract(tokenAddress), [getContract]);
};

export const useL1TokenContract = () => {
  const createContractL1 = useCreateContractL1();
  const getContract = useContract(L1_ERC20_ABI, createContractL1);

  return useCallback(tokenAddress => getContract(tokenAddress), [getContract]);
};

export const useStarknetContract = () => {
  const createContractL1 = useCreateContractL1();
  const {STARKNET_CONTRACT_ADDRESS} = useEnvs();
  const getContract = useContract(L1_MESSAGING_ABI, createContractL1);

  return useMemo(() => getContract(STARKNET_CONTRACT_ADDRESS), [getContract]);
};

export const useDaiTeleportGatewayContract = () => {
  const createContractL2 = useCreateContractL2();
  const {DAI_TELEPORT_GATEWAY_CONTRACT_ADDRESS} = useEnvs();
  const getContract = useContract(L2_DAI_TELEPORT_GATEWAY, createContractL2);

  return useMemo(() => getContract(DAI_TELEPORT_GATEWAY_CONTRACT_ADDRESS), [getContract]);
};

export const useTeleportOracleAuthContract = () => {
  const createContractL1 = useCreateContractL1();
  const {TELEPORT_ORACLE_AUTH_CONTRACT_ADDRESS} = useEnvs();
  const getContract = useContract(L1_TELEPORT_ORACLE_AUTH_ABI, createContractL1);

  return useMemo(() => getContract(TELEPORT_ORACLE_AUTH_CONTRACT_ADDRESS), [getContract]);
};

export const useL2TokenBridgeContract = () => {
  const createContractL2 = useCreateContractL2();
  const getContract = useContract(L2_BRIDGE_ABI, createContractL2);

  return useCallback(bridgeAddress => getContract(bridgeAddress), [getContract]);
};

export const useL1TokenBridgeContract = () => {
  const createContractL1 = useCreateContractL1();
  const getTokenBridgeContract = useContract(L1_ERC20_BRIDGE_ABI, createContractL1);
  const getDAIBridgeContract = useContract(L1_DAI_BRIDGE_ABI, createContractL1);
  const getEthBridgeContract = useContract(L1_ETH_BRIDGE_ABI, createContractL1);
  const {chainId} = useL1Wallet();

  return useCallback(
    bridgeAddress => {
      switch (bridgeAddress) {
        case Tokens.L1.ETH.bridgeAddress[chainId]:
          return getEthBridgeContract(bridgeAddress);
        case Tokens.L1.DAI.bridgeAddress[chainId]:
          return getDAIBridgeContract(bridgeAddress);
        default:
          return getTokenBridgeContract(bridgeAddress);
      }
    },
    [getTokenBridgeContract, getEthBridgeContract, getDAIBridgeContract, chainId]
  );
};
