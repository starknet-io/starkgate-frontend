import {ChainType} from '../../enums';

export default [
  {
    address: {
      [ChainType.MAIN.id]: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39',
      [ChainType.GOERLI.id]: '0xce87904b5fce1ced9e548c061d0ceb9950401758'
    },
    name: 'HEX',
    symbol: 'HEX'
  },
  {
    address: {
      [ChainType.MAIN.id]: '0x6b175474e89094c44da98b954eedeac495271d0f',
      [ChainType.GOERLI.id]: '0x0b788e8d159c1959bd8dde838790df79d015ee57'
    },
    name: 'Dai Stablecoin',
    symbol: 'DAI'
  },
  {
    address: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xe4C2493C66e068D65Cf1C38a2d7bDa25d9f08980'
    },
    name: 'ERC20 StarkNet Token',
    symbol: 'E20ST'
  }
];
