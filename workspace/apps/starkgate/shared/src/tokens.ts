import {ChainType} from '@starkware-webapps/enums';

export const Tokens = {
  L1: {
    ETH: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419',
        [ChainType.L1.GOERLI]: '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e'
      },
      tokenAddress: null
    },
    WBTC: {
      name: 'Wrapped BTC',
      symbol: 'WBTC',
      decimals: 8,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0x283751A21eafBFcD52297820D27C1f1963D9b5b4',
        [ChainType.L1.GOERLI]: '0xf29aE3446Ce4688fCc792b232C21D1B9581E7baC'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        [ChainType.L1.GOERLI]: '0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05'
      }
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xF6080D9fbEEbcd44D89aFfBFd42F098cbFf92816',
        [ChainType.L1.GOERLI]: '0xBA9cE9F22A3Cfa7Fcb5c31f6B2748b1e72C06204'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        [ChainType.L1.GOERLI]: '0x07865c6e87b9f70255377e024ace6630c1eaa37f'
      }
    },
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xbb3400F107804DFB482565FF1Ec8D8aE66747605',
        [ChainType.L1.GOERLI]: '0xA1f590F18b23EFece02804704E5006E91348C997'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        [ChainType.L1.GOERLI]: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9'
      }
    },
    DAI: {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0x9F96fE0633eE838D0298E8b8980E6716bE81388d',
        [ChainType.L1.GOERLI]: '0xaB00D7EE6cFE37cCCAd006cEC4Db6253D7ED3a22'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        [ChainType.L1.GOERLI]: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844'
      }
    },
    rETH: {
      name: 'Rocket Pool ETH',
      symbol: 'rETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0xD2ef821C56B20a7451dbbEd1ec003De6C44F8dC0'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0x178E141a0E3b34152f73Ff610437A7bf9B83267A'
      }
    },
    wstETH: {
      name: 'Wrapped liquid staked Ether 2.0',
      symbol: 'wstETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0x190c98506a5396A30CA759A139F3Fb59EF519A5D'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '',
        [ChainType.L1.GOERLI]: '0x6320cD32aA674d2898A68ec82e869385Fc5f7E2f'
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
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: true
      },
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
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x07aeec4870975311a7396069033796b61cd66ed49d22a786cba12a8d76717302',
        [ChainType.L2.GOERLI]: '0x72eeb90833bae233a9585f2fa9afc99c187f0a3a82693becd6a4d700b37fc6b'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac',
        [ChainType.L2.GOERLI]: '0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56'
      }
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x05cd48fccbfd8aa2773fe22c217e808319ffcc1c5a6a463f7d8fa2da48218196',
        [ChainType.L2.GOERLI]: '0x001d5b64feabc8ac7c839753994f469704c6fabdd45c8fe6d26ed57b5eb79057'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8',
        [ChainType.L2.GOERLI]: '0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426'
      }
    },
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x074761a8d48ce002963002becc6d9c3dd8a2a05b1075d55e5967f42296f16bd0',
        [ChainType.L2.GOERLI]: '0x71d54658ca3c6ccd84ff958adb7498b2e71ba008e29b643983221ed2bd71b69'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8',
        [ChainType.L2.GOERLI]: '0x386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a'
      }
    },
    DAI: {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      fastWithdrawal: true,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x075ac198e734e289a6892baa8dd14b21095f13bf8401900f5349d5569c3f6e60',
        [ChainType.L2.GOERLI]: '0x057b7fe4e59d295de5e7955c373023514ede5b972e872e9aa5dcdf563f5cfacb'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3',
        [ChainType.L2.GOERLI]: '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9'
      }
    },
    rETH: {
      name: 'Rocket Pool ETH',
      symbol: 'rETH',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: false,
        [ChainType.L2.GOERLI]: true
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x00214e168720c6eed858066bea070afa828512e83edcfc28846f0e87221f77f6'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x002133188109385fedaac0b1bf9de1134e271b88efcd21e2ea0dac460639fbe2'
      }
    },
    wstETH: {
      name: 'Wrapped liquid staked Ether 2.0',
      symbol: 'wstETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x0399a6011b666888d647665fd65d6dcc7c2690c72d4c4454cae987f19f6ef609'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '',
        [ChainType.L2.GOERLI]: '0x0335bc6e1cf6d9527da4f8044c505906ad6728aeeddfba8d7000b01b32ffe66b'
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
