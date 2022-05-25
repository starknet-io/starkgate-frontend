import {ChainType} from '../enums';

export default {
  L1: {
    ETH: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419',
        [ChainType.L1.GOERLI]: '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e'
      }
    },
    WBTC: {
      name: 'Wrapped BTC',
      symbol: 'WBTC',
      decimals: 8,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0xf29aE3446Ce4688fCc792b232C21D1B9581E7baC'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05'
      }
    },
    USDC: {
      name: 'Goerli USD Coin',
      symbol: 'USDC',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0xBA9cE9F22A3Cfa7Fcb5c31f6B2748b1e72C06204'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0x07865c6e87b9f70255377e024ace6630c1eaa37f'
      }
    },
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0xA1f590F18b23EFece02804704E5006E91348C997'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9'
      }
    },
    DAI: {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0x659a00c33263d9254Fed382dE81349426C795BB6',
        [ChainType.L1.GOERLI]: '0xd8beAa22894Cd33F24075459cFba287a10a104E4'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        [ChainType.L1.GOERLI]: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844'
      }
    },
    SLF: {
      name: 'SelfService',
      symbol: 'SLF',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0x160e7631f22035149A01420cADD1012267551181'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0xd44BB808bfE43095dBb94c83077766382D63952a'
      }
    }
  },
  L2: {
    ETH: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82',
        [ChainType.L2.GOERLI]: '0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        [ChainType.L2.GOERLI]: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
      }
    },
    WBTC: {
      name: 'Wrapped BTC',
      symbol: 'WBTC',
      decimals: 8,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x72eeb90833bae233a9585f2fa9afc99c187f0a3a82693becd6a4d700b37fc6b'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56'
      }
    },
    USDC: {
      name: 'Goerli USD Coin',
      symbol: 'USDC',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x001d5b64feabc8ac7c839753994f469704c6fabdd45c8fe6d26ed57b5eb79057'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426'
      }
    },
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x71d54658ca3c6ccd84ff958adb7498b2e71ba008e29b643983221ed2bd71b69'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a'
      }
    },
    DAI: {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x001108cdbe5d82737b9057590adaf97d34e74b5452f0628161d237746b6fe69e',
        [ChainType.L2.GOERLI]: '0x0278f24c3e74cbf7a375ec099df306289beb0605a346277d200b791a7f811a19'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3',
        [ChainType.L2.GOERLI]: '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9'
      }
    },
    SLF: {
      name: 'SelfService',
      symbol: 'SLF',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x00fd2a9843c19436542e0ac7fc7b5cbf1d0b69fc2abea6d68591e46a5ca2d75a'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x07a39a50bf689e9430fc81fba0f4d46e245e1657e77455548ed7e32c808cfc10'
      }
    }
  }
};
