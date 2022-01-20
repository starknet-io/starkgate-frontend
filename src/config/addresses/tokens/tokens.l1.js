import {ChainType, NetworkType} from '../../../enums';

export const L1Tokens = [
  {
    name: NetworkType.L1.tokenName,
    symbol: NetworkType.L1.symbol,
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xcf98f0A8edC6a730E1CA6B64a2528c6bE031Cb12'
    }
  },
  {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    decimals: 8,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xf29aE3446Ce4688fCc792b232C21D1B9581E7baC'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05'
    }
  },
  {
    name: 'Goerli USD Coin',
    symbol: 'USDC',
    decimals: 6,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xBA9cE9F22A3Cfa7Fcb5c31f6B2748b1e72C06204'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x07865c6e87b9f70255377e024ace6630c1eaa37f'
    }
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xA1f590F18b23EFece02804704E5006E91348C997'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9'
    }
  },
  {
    name: 'Magic Internet Money',
    symbol: 'MIM',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x865C602d591eB18e946e9edF73895F6e699EB118'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x86124F8CF3C4AB702cEF895483067e46CE8764f9'
    }
  },
  {
    name: 'Frax',
    symbol: 'FRAX',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x9818b35b62B1B394614f97b5e8BC158907E4eb1C'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xBd97097dF545cc9734b96A5f3C5b1752C9179649'
    }
  }
];
