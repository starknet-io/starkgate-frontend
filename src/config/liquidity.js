import {ChainType} from '../enums';

export default [
  {
    id: 'banxa',
    logoPath: 'liquidity/banxa.svg',
    name: 'Banxa',
    description: 'Buy crypto with credit card directly to StarkNet',
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
    id: 'layerswap',
    logoPath: 'liquidity/layerswap.svg',
    name: 'Layerswap',
    description: 'Move crypto from Coinbase, Binance, FTX and other exchanges to StarkNet',
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
    logoPath: 'liquidity/orbiter.svg',
    name: 'Orbiter',
    description: 'Cross-rollup bridge. Make deposits from other L2 rollups to StarkNet',
    link: {
      [ChainType.L1.MAIN]: {
        url: 'https://www.orbiter.finance/',
        qsParams: {
          refer: 'starknet',
          dests: 'starknet'
        }
      }
    }
  }
];
