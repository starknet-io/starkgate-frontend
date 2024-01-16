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
      escrowAddress: {
        [ChainType.L1.MAIN]: '0x0437465dfb5B79726e35F08559B0cBea55bb585C',
        [ChainType.L1.GOERLI]: '0x38c3DDF1eF3e045abDDEb94f4e7a1a0d5440EB44'
      },
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
        [ChainType.L1.MAIN]: '0xcf58536D6Fab5E59B654228a5a4ed89b13A876C2',
        [ChainType.L1.GOERLI]: '0xD2ef821C56B20a7451dbbEd1ec003De6C44F8dC0'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0xae78736Cd615f374D3085123A210448E74Fc6393',
        [ChainType.L1.GOERLI]: '0x178E141a0E3b34152f73Ff610437A7bf9B83267A'
      }
    },
    wstETH: {
      name: 'Wrapped liquid staked Ether 2.0',
      symbol: 'wstETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xBf67F59D2988A46FBFF7ed79A621778a3Cd3985B',
        [ChainType.L1.GOERLI]: '0x190c98506a5396A30CA759A139F3Fb59EF519A5D'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
        [ChainType.L1.GOERLI]: '0x6320cD32aA674d2898A68ec82e869385Fc5f7E2f'
      }
    },
    LUSD: {
      name: 'Liquity USD',
      symbol: 'LUSD',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xF3F62F23dF9C1D2C7C63D9ea6B90E8d24c7E3DF5',
        [ChainType.L1.GOERLI]: '0xc2AFba3f4f6a88Ad738aa0e9cf746B38370415a4'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
        [ChainType.L1.GOERLI]: '0x76ea225E132609D387464e11ce5EFA1764A3799B'
      }
    },
    R: {
      name: 'R Stablecoin',
      symbol: 'R',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xb27d0dCAFd63db302C155c8864886f33BD2a41E5',
        [ChainType.L1.GOERLI]: '0xe2969b9d9de178cccc7199234d3e0543da3a7733'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x183015a9bA6fF60230fdEaDc3F43b3D788b13e21',
        [ChainType.L1.GOERLI]: '0x9b41fE4EE4F23507953CCA339A4eC27eAc9e02b8'
      }
    },
    FRAX: {
      name: 'Frax',
      symbol: 'FRAX',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xDc687e1E0B85CB589b2da3C47c933De9Db3d1ebb',
        [ChainType.L1.GOERLI]: ''
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        [ChainType.L1.GOERLI]: ''
      }
    },
    FXS: {
      name: 'Frax Share',
      symbol: 'FXS',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0x66ba83ba3D3AD296424a2258145d9910E9E40B7C',
        [ChainType.L1.GOERLI]: ''
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
        [ChainType.L1.GOERLI]: ''
      }
    },
    sfrxETH: {
      name: 'Staked Frax Ether',
      symbol: 'sfrxETH',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xd8E8531fdD446DF5298819d3Bc9189a5D8948Ee8',
        [ChainType.L1.GOERLI]: ''
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0xac3E018457B222d93114458476f3E3416Abbe38F',
        [ChainType.L1.GOERLI]: ''
      }
    },
    UNI: {
      name: 'Uniswap',
      symbol: 'UNI',
      decimals: 18,
      bridgeAddress: {
        [ChainType.L1.MAIN]: '0xf76e6bF9e2df09D0f854F045A3B724074dA1236B',
        [ChainType.L1.GOERLI]: '0xc0c0eB9eeb90243C3FE4e562F12Ff01e8fE8Ff03'
      },
      tokenAddress: {
        [ChainType.L1.MAIN]: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        [ChainType.L1.GOERLI]: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
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
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
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
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: true
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x0078da8023b3c08e5a41540a34f7c385fd4f4540d5668f1be3ede0d3bb1b9d4d',
        [ChainType.L2.GOERLI]: '0x00214e168720c6eed858066bea070afa828512e83edcfc28846f0e87221f77f6'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x0319111a5037cbec2b3e638cc34a3474e2d2608299f3e62866e9cc683208c610',
        [ChainType.L2.GOERLI]: '0x002133188109385fedaac0b1bf9de1134e271b88efcd21e2ea0dac460639fbe2'
      }
    },
    wstETH: {
      name: 'Wrapped liquid staked Ether 2.0',
      symbol: 'wstETH',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x0088eedbe2fe3918b69ccb411713b7fa72079d4eddf291103ccbe41e78a9615c',
        [ChainType.L2.GOERLI]: '0x0399a6011b666888d647665fd65d6dcc7c2690c72d4c4454cae987f19f6ef609'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x42b8f0484674ca266ac5d08e4ac6a3fe65bd3129795def2dca5c34ecc5f96d2',
        [ChainType.L2.GOERLI]: '0x0335bc6e1cf6d9527da4f8044c505906ad6728aeeddfba8d7000b01b32ffe66b'
      }
    },
    LUSD: {
      name: 'Liquity USD',
      symbol: 'LUSD',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: true
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x05841ed9b790719b61dc98826246a7a3012dd35b0ed728e3c455af2647385c80',
        [ChainType.L2.GOERLI]: '0x02edc855e8e45fa1826d53a144c080fd41bb33f9468190cf60089f45cbc3c223'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x070a76fd48ca0ef910631754d77dd822147fe98a569b826ec85e3c33fde586ac',
        [ChainType.L2.GOERLI]: '0x025731f5f9629ff74d1c5f787ad1ea0ebb9157210047f6c9e3a974f771550cf4'
      }
    },
    R: {
      name: 'R Stablecoin',
      symbol: 'R',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: true
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x00b0cefce685e321eba324fac1c8e2db768892bc1ddb8375fe40fd269fa69fb2',
        [ChainType.L2.GOERLI]: '0x060fbf0392c84eae8bf3d5a79e29e6f250933fabeab00cef13c8f1a68c1cca6f'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x01fa2fb85f624600112040e1f3a848f53a37ed5a7385810063d5fe6887280333',
        [ChainType.L2.GOERLI]: '0x02c479575aa7399ca4757927c02a71334ff6f1b12693fa9043cf9f49b83d0000'
      }
    },
    FRAX: {
      name: 'Frax',
      symbol: 'FRAX',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x006646a87b8e9e51a893c52facd89f99539a152b96e72daee6a7a3734aa5299a',
        [ChainType.L2.GOERLI]: ''
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x009c6b4fb13dfaa025c1383ed6190af8ed8cbb09d9588a3bb020feb152442406',
        [ChainType.L2.GOERLI]: ''
      }
    },
    FXS: {
      name: 'Frax Share',
      symbol: 'FXS',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x06bf25c0911c6c63abfe3600428144d0d0dbf8b7bfbc44306a3386aa95a24296',
        [ChainType.L2.GOERLI]: ''
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x0058efd0e73c33a848ffaa88738d128ebf0af98ea78cf3c14dc757bb02d39ffb',
        [ChainType.L2.GOERLI]: ''
      }
    },
    sfrxETH: {
      name: 'Staked Frax Ether',
      symbol: 'sfrxETH',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: true,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x06dcc61c4cf056ff42a8f4b8635c207e3da73332282aa2132058022520fa0179',
        [ChainType.L2.GOERLI]: ''
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x04578fffc279e61b5cb0267a5f8e24b6089d40f93158fbbad2cb23b8622c9233',
        [ChainType.L2.GOERLI]: ''
      }
    },
    UNI: {
      name: 'Uniswap',
      symbol: 'UNI',
      decimals: 18,
      autoWithdrawal: {
        [ChainType.L2.MAIN]: false,
        [ChainType.L2.GOERLI]: false
      },
      bridgeAddress: {
        [ChainType.L2.MAIN]: '0x04fe90c0c4594b4a5ce3031a4bbdfbc7c046b4b9d7cf31b79647540c85b8ec79',
        [ChainType.L2.GOERLI]: '0x05f1299e76372f9b7f3d6b4be58c67af8eb27af040bf288206f38e6d5afd0abd'
      },
      tokenAddress: {
        [ChainType.L2.MAIN]: '0x049210ffc442172463f3177147c1aeaa36c51d152c1b0630f2364c300d4f48ee',
        [ChainType.L2.GOERLI]: '0x02a19c5ec71efb0022cae7db810d71280e3fccd2b7b7503c87bcb851089e0f34'
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
