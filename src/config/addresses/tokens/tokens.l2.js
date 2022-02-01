import {ChainType, NetworkType} from '../../../enums';

export const L2Tokens = [
  {
    name: NetworkType.L1.tokenName,
    symbol: NetworkType.L1.symbol,
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
      [ChainType.GOERLI.id]: '0x001d5b64feabc8ac7c839753994f469704c6fabdd45c8fe6d26ed57b5eb79057'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426'
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
    name: 'DAI',
    symbol: 'DAI',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x015605ab0d2a2883dd72fe014bb997578fe8ce73caa91d1c0973a68efc6a43c5'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x00da19dab05e9f3cd09c3aa0d8046415b3d7f7dbbd83e1c2e4946792298fbe28'
    }
  }
];
