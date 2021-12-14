import {ChainType} from '../../enums';

export default [
  {
    address: {
      [ChainType.MAIN.id]: '',
      // [ChainType.GOERLI.id]: '0x06ebb42ca1b237cd92fcc677d9ff02ffadcc3c66d5748f6ebd795b531c51266c'
      [ChainType.GOERLI.id]: '0x021eb73bd66eb18c37ec7b1e2567bc3fa8ba9ac0d391b53745a5f9d483217595'
    },
    name: 'ERC20 StarkNet Token',
    symbol: 'E20ST'
  }
];
