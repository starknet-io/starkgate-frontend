import {ChainTypeL1} from '@starkware-webapps/enums';

export const toChainType = (network: string) => {
  if (network === 'main') {
    return ChainTypeL1.MAIN;
  }

  return ChainTypeL1.GOERLI;
};

export const toChainName = (network: string) => {
  if (network && network.toLowerCase() === 'main') {
    return 'main';
  }

  return 'goerli';
};
