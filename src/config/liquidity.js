import {ChainType} from '../enums';

export default [
  {
    id: 'banxa',
    logoPath: 'liquidity/banxa.svg',
    name: 'Banxa',
    description: 'Convert fiat money into L2 cryptocurrencies',
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
  }
];
