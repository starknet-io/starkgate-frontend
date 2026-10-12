import {isAddress} from 'web3-validator';

import {ChainTypeL1} from '@starkware-webapps/enums';

import {generateRandomHex} from './index';
import {toHexLength} from './parser';

export const toEthereumAddress = (address: string) => {
  if (isAddress(address)) {
    return toHexLength(address, 40);
  }
};

export const toEthereumSignature = (signature: string) => {
  return toHexLength(signature, 130);
};

/**
 * Maps the deployment's `VITE_APP_CHAIN` value to an Ethereum mainnet chain id.
 *
 * The previous implementation silently returned `GOERLI` from its `default` branch, so any
 * typo or unknown spelling ('mainnet', 'mainNet', 'sepolia', an empty string, a truncated
 * env var) produced a testnet chain id with no error and no log. For a bridge that means a
 * misconfigured production build quietly presents testnet semantics — wrong L1 chain id,
 * wrong RPC endpoints, wrong contract addresses.
 *
 * Unknown values now throw, so a misconfiguration fails loudly at startup instead of
 * signing against the wrong network.
 */
export const toEthereumChainId = (chainId: string): ChainTypeL1 => {
  switch (chainId) {
    case 'main':
      return ChainTypeL1.MAIN;
    case 'goerli':
      return ChainTypeL1.GOERLI;
    case 'sepolia':
      return ChainTypeL1.SEPOLIA;
    default:
      throw new Error(
        `Unsupported chain "${chainId}". Expected one of: "main", "goerli", "sepolia". ` +
          'Refusing to fall back to a default network, because a silent fallback can build a ' +
          'mainnet bundle that talks to testnet infrastructure.',
      );
  }
};

export const generateEthereumSignature = () => {
  return toEthereumSignature(`${generateRandomHex()}1c`);
};
