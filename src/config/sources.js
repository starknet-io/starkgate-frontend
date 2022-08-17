import {ChainType} from '@starkware-industries/commons-js-enums';

export const SourceGroup = {
  ETHEREUM: 'ethereum',
  CHAIN: 'chain',
  FIAT_ON_RAMP: 'fiat_on_ramp',
  EXCHANGE: 'exchange'
};

export default {
  [SourceGroup.ETHEREUM]: {
    category_label: 'Chain',
    sources: [
      {
        id: 'eth',
        label: 'Ethereum Mainnet',
        icon: {
          path: 'tokens/ETH'
        }
      }
    ]
  },
  [SourceGroup.CHAIN]: {
    sources: [
      {
        id: 'polygon',
        label: 'Polygon',
        icon: {
          path: 'chains/polygon'
        }
      },
      {
        id: 'arbitrum',
        label: 'Arbitrum',
        icon: {
          path: 'chains/arbitrum',
          background: false
        }
      },
      {
        id: 'optimism',
        label: 'Optimism',
        icon: {
          path: 'chains/optimism',
          background: false
        }
      },
      {
        id: 'other_chains',
        label: 'Other Chains',
        description: 'Transfer crypto between centralized exchanges and StarkNet',
        icon: {
          path: 'icons/chains'
        }
      }
    ],
    description: 'Transfer crypto between {{label}} and StarkNet',
    providers: [
      'orbiter'
      // {
      //   id: 'orbiter',
      //   logoPath: 'providers/orbiter.svg',
      //   label: 'Orbiter Finance',
      //   description: 'Cross-rollup bridge. Make deposits from other L2 rollups to StarkNet',
      //   link: {
      //     [ChainType.L1.MAIN]: {
      //       url: 'https://www.orbiter.finance/',
      //       qsParams: {
      //         refer: 'starknet',
      //         dests: 'starknet'
      //       }
      //     }
      //   }
      // }
    ]
  },
  [SourceGroup.FIAT_ON_RAMP]: {
    category_label: 'Fiat on-ramp',
    deposit_sources: [
      {
        id: 'card',
        label: 'Payment Card',
        icon: {
          path: 'icons/card'
        }
      }
    ],
    description: 'Buy crypto with credit card directly to StarkNet',
    providers: [
      'banxa',
      'ramp'
      // {
      //   id: 'banxa',
      //   logoPath: 'providers/banxa.svg',
      //   label: 'Banxa',
      //   description: 'Buy crypto with credit card directly to StarkNet',
      //   url: {
      //     [ChainType.L1.GOERLI]: '',
      //     [ChainType.L1.MAIN]: 'https://starkware.banxa.com/'
      //   }
      // },
      // {
      //   id: 'ramp',
      //   logoPath: 'providers/ramp.svg',
      //   label: 'Ramp Network',
      //   description: 'Buy crypto with credit card directly to StarkNet',
      //   url: {
      //     [ChainType.L1.GOERLI]: '',
      //     [ChainType.L1.MAIN]: 'https://starkware.banxa.com/'
      //   }
      // }
    ]
  },
  [SourceGroup.EXCHANGE]: {
    category_label: 'Exchange',
    sources: [
      {
        id: 'ftx',
        label: 'Ftx.com',
        icon: {
          path: 'exchanges/ftx'
        }
        // deposit: {
        //   description: String,
        //   url: URL // Layerswap url
        // },
        // withdraw: {
        //   description: String,
        //   url: URL // Layerswap url
        // }
      },
      {
        id: 'coinbase',
        label: 'Coinbase',
        icon: {
          path: 'exchanges/coinbase',
          background: false
        }
      },
      {
        id: 'okx',
        label: 'OKX',
        icon: {
          path: 'exchanges/okx'
        }
      },
      {
        id: 'huobi',
        label: 'Huobi',
        icon: {
          path: 'exchanges/huobi'
        }
      },
      {
        id: 'other_exchanges',
        label: 'Other Exchanges',
        description: 'Transfer crypto between exchanges and StarkNet',
        icon: {
          path: 'icons/exchange'
        }
      }
    ],
    description: 'Transfer crypto between {{label}} and StarkNet',
    providers: [
      'layerswap'
      // {
      //   id: 'layerswap',
      //   logoPath: 'providers/layerswap.svg',
      //   label: 'Layerswap',
      //   description: 'Buy crypto with credit card directly to StarkNet',
      //   url: {
      //     [ChainType.L1.GOERLI]: '',
      //     [ChainType.L1.MAIN]: 'https://starkware.banxa.com/'
      //   }
      // }
    ]
  }
};
