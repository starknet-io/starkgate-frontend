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
    name: 'DAI',
    symbol: 'DAI',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x3ebB6C28BD63aDa2feA81f1e6c5a50aFe53B5feE'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844'
    }
  }
];
