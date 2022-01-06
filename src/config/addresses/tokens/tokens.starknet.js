import {ChainType, NetworkType} from '../../../enums';

export const StarknetTokens = [
  {
    name: NetworkType.ETHEREUM.tokenName,
    symbol: NetworkType.ETHEREUM.symbol,
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x30fab1f1cc35d6ab0a992240528e122bc46c196eebfed9d21a5f800f72f066d'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x2dd93e385742984bf2fc887cd5d8b5ec6917d80af09cf7a00a63710ad51ba53'
    }
  },
  {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    decimals: 8,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x72eeb90833bae233a9585f2fa9afc99c187f0a3a82693becd6a4d700b37fc6b'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56'
    }
  },
  {
    name: 'Goerli USD Coin',
    symbol: 'USDC',
    decimals: 6,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x28248893ca3bab78fe7b0a053d3ddc450c291f3572e175699dbd1f7076dc800'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x77367abf77245c0e74728e4f9dc7c944b2bc5c1bdb6902575ff97aea7653842'
    }
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x71d54658ca3c6ccd84ff958adb7498b2e71ba008e29b643983221ed2bd71b69'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a'
    }
  },
  {
    name: 'Magic Internet Money',
    symbol: 'MIM',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x341747554ec54280d2e92eab57295055955fd1e8ec2292910163ca60c85e74f'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x1dd62766ff2a0d3b996857e6a04490c74649386dc52dc4b6153b9acf5f4cae3'
    }
  },
  {
    name: 'Frax',
    symbol: 'FRAX',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x254e681ffbf99c79e9e56aa38b2212914cadafa97d6c4f470589b1d43932a5f'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x1a53260bb912e49d668ae4ea8c4b5c1ebf1441f2acc1fd7fde74836738ed8da'
    }
  }
];
