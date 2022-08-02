import {ChainType} from '@starkware-commons-js/enums';

export default [
  {
    id: 'banxa',
    logoPath: 'liquidity/banxa.svg',
    name: 'Banxa',
    description: 'Buy crypto with credit card directly to StarkNet',
    url: {
      [ChainType.L1.GOERLI]: '',
      [ChainType.L1.MAIN]: 'https://starkware.banxa.com/'
    }
  },
  {
    id: 'layerswap',
    logoPath: 'liquidity/layerswap.svg',
    name: 'Layerswap',
    description: 'Move crypto from Coinbase, Binance, FTX and other exchanges to StarkNet',
    url: {
      [ChainType.L1.GOERLI]: 'https://testnet.layerswap.io/?destNetwork=starknet_goerli',
      [ChainType.L1.MAIN]: 'https://layerswap.io/?destNetwork=starknet_mainnet'
    }
  },
  {
    id: 'orbiter',
    logoPath: 'liquidity/orbiter.svg',
    name: 'Orbiter',
    description: 'Cross-rollup bridge. Make deposits from other L2 rollups to StarkNet',
    url: {
      [ChainType.L1.GOERLI]: '',
      [ChainType.L1.MAIN]: 'https://www.orbiter.finance/?refer=starknet&dests=starknet'
    }
  }
];
