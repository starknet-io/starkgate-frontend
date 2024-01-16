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

export const toEthereumChainId = (chainId: string): ChainTypeL1 => {
  switch (chainId) {
    case 'main':
      return ChainTypeL1.MAIN;
    case 'goerli':
      return ChainTypeL1.GOERLI;
    default:
      return ChainTypeL1.GOERLI;
  }
};

export const generateEthereumSignature = () => {
  return toEthereumSignature(`${generateRandomHex()}1c`);
};
