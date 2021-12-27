import {ChainType} from '../../../enums';

export const EthereumTokens = [
  {
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x5542fd7dc64008978B50Ccb56274a00DEF2B57FE'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xe4C2493C66e068D65Cf1C38a2d7bDa25d9f08980'
    },
    name: 'Mock ERC20 Token',
    symbol: 'TEST'
  }
];
