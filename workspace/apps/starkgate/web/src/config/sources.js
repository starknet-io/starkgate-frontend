import {ChainType, NetworkType} from '@starkware-webapps/enums';

export const categories = {
  chains: {
    label: 'Chains'
  },
  fiat: {label: 'Fiat on-ramp'},
  exchanges: {
    label: 'Exchanges'
  }
};

export const sources = {
  [NetworkType.L1]: {
    label: 'Ethereum',
    icon: {
      path: 'tokens/ETH'
    }
  },
  polygon: {
    label: 'Polygon',
    icon: {
      path: 'chains/polygon'
    }
  },
  arbitrum: {
    label: 'Arbitrum',
    icon: {
      path: 'chains/arbitrum',
      background: false
    }
  },
  optimism: {
    label: 'Optimism',
    icon: {
      path: 'chains/optimism',
      background: false
    }
  },
  other_chains: {
    label: 'Other Chains',
    description: 'Transfer crypto between other chains and Starknet',
    icon: {
      path: 'icons/chains'
    }
  },
  card: {
    label: 'Payment Card',
    description: 'Buy crypto with credit card directly to Starknet',
    icon: {
      path: 'icons/card'
    }
  },
  coinbase: {
    label: 'Coinbase',
    icon: {
      path: 'exchanges/coinbase',
      background: false
    }
  },
  okx: {
    label: 'OKX',
    icon: {
      path: 'exchanges/okx'
    }
  },
  huobi: {
    label: 'Huobi',
    icon: {
      path: 'exchanges/huobi'
    }
  },
  other_exchanges: {
    label: 'Other Exchanges',
    description: 'Transfer crypto between exchanges and Starknet',
    icon: {
      path: 'icons/exchange'
    }
  }
};

export const providers = [
  {
    id: 'banxa',
    logoPath: 'providers/banxa',
    label: 'Banxa',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://starkware.banxa.com/',
        qsParams: {
          walletAddress: '{{accountL2}}'
        }
      }
    }
  },
  {
    id: 'ramp',
    logoPath: 'providers/ramp',
    label: 'Ramp',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://ramp.network/buy/',
        qsParams: {
          defaultAsset: 'STARKNET_ETH'
        }
      }
    }
  },
  {
    id: 'layerswap',
    logoPath: 'providers/layerswap',
    label: 'Layerswap',
    link: {
      [ChainType.L1.GOERLI]: {
        url: 'https://testnet.layerswap.io/',
        qsParams: {
          destNetwork: 'starknet_goerli'
        }
      },
      [ChainType.L1.MAIN]: {
        url: 'https://layerswap.io/',
        qsParams: {
          destNetwork: 'starknet_mainnet'
        }
      }
    }
  },
  {
    id: 'orbiter',
    logoPath: 'providers/orbiter',
    label: 'Orbiter',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://www.orbiter.finance/',
        qsParams: {
          refer: 'starknet',
          dests: 'starknet'
        }
      }
    }
  },
  {
    id: 'rhinofi',
    logoPath: 'providers/rhinofi',
    label: 'Rhino.fi',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://app.rhino.fi/bridge/',
        qsParams: {
          token: 'ETH',
          chainOut: 'STARKNET',
          chain: 'ETHEREUM'
        }
      }
    }
  }
];

export const depositConfig = {
  chains: {
    [NetworkType.L1]: [],
    polygon: ['orbiter', 'layerswap', 'rhinofi'],
    arbitrum: ['orbiter', 'layerswap', 'rhinofi'],
    optimism: ['orbiter', 'layerswap', 'rhinofi'],
    other_chains: ['orbiter', 'layerswap', 'rhinofi']
  },
  fiat: {
    card: ['banxa', 'ramp']
  },
  exchanges: {
    coinbase: ['layerswap'],
    okx: ['layerswap'],
    huobi: ['layerswap'],
    other_exchanges: ['layerswap']
  }
};

export const withdrawConfig = {
  chains: {
    [NetworkType.L1]: [],
    polygon: ['orbiter', 'layerswap', 'rhinofi'],
    arbitrum: ['orbiter', 'layerswap', 'rhinofi'],
    optimism: ['orbiter', 'layerswap', 'rhinofi'],
    other_chains: ['orbiter', 'layerswap', 'rhinofi']
  },
  exchanges: {
    coinbase: ['layerswap'],
    okx: ['layerswap'],
    huobi: ['layerswap'],
    other_exchanges: ['layerswap']
  }
};
