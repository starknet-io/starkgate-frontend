import {ethers} from 'ethers';
import {useCallback} from 'react';

import {
  L1_DAI_BRIDGE_ABI,
  L1_ERC20_ABI,
  L1_ERC20_BRIDGE_ABI,
  L1_ETH_BRIDGE_ABI,
  L1_TELEPORT_ORACLE_AUTH_ABI
} from '@abis';
import {useEnvs} from '@hooks';
import {useEthereumWallet} from '@providers';
import {Tokens} from '@starkgate/shared';
import {useContract} from '@starkware-webapps/ui';

const useCreateContractL1 = () => {
  const {getEthereumSigner} = useEthereumWallet();

  return useCallback(
    async (address, abi) => {
      const signer = await getEthereumSigner();
      if (signer) {
        return new ethers.Contract(address, abi, signer);
      }
    },
    [getEthereumSigner]
  );
};

export const useL1TokenContract = () => {
  const createContractL1 = useCreateContractL1();
  const getContract = useContract(L1_ERC20_ABI, createContractL1);

  return useCallback(tokenAddress => getContract(tokenAddress), [getContract, createContractL1]);
};

export const useTeleportOracleAuthContract = () => {
  const {TELEPORT_ORACLE_AUTH_CONTRACT_ADDRESS} = useEnvs();
  const createContractL1 = useCreateContractL1();
  const getContract = useContract(L1_TELEPORT_ORACLE_AUTH_ABI, createContractL1);

  return useCallback(
    () => getContract(TELEPORT_ORACLE_AUTH_CONTRACT_ADDRESS),
    [getContract, createContractL1]
  );
};

export const useL1TokenBridgeContract = () => {
  const {SUPPORTED_L1_CHAIN_ID} = useEnvs();
  const createContractL1 = useCreateContractL1();
  const getTokenBridgeContract = useContract(L1_ERC20_BRIDGE_ABI, createContractL1);
  const getDAIBridgeContract = useContract(L1_DAI_BRIDGE_ABI, createContractL1);
  const getEthBridgeContract = useContract(L1_ETH_BRIDGE_ABI, createContractL1);

  return useCallback(
    bridgeAddress => {
      switch (bridgeAddress) {
        case Tokens.L1.ETH.bridgeAddress[SUPPORTED_L1_CHAIN_ID]:
          return getEthBridgeContract(bridgeAddress);
        case Tokens.L1.DAI.bridgeAddress[SUPPORTED_L1_CHAIN_ID]:
          return getDAIBridgeContract(bridgeAddress);
        default:
          return getTokenBridgeContract(bridgeAddress);
      }
    },
    [getTokenBridgeContract, getEthBridgeContract, getDAIBridgeContract, createContractL1]
  );
};
