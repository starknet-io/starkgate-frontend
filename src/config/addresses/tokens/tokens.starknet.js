import {ChainType, NetworkType} from '../../../enums';

export const StarknetTokens = [
  {
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x012291a5bcd1b08e237047277a6055aec5a33d0e15610f869d517575ca983a82'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x03188903406daaaedd123598a8bd1f5dbec34720089037f4bf1473e51857e190'
    },
    name: NetworkType.ETHEREUM.tokenName,
    symbol: NetworkType.ETHEREUM.symbol
  },
  {
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x0061f462a8a2ea511189e4ec73d115ef65fad071e643e99644818249604a525d'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x021eb73bd66eb18c37ec7b1e2567bc3fa8ba9ac0d391b53745a5f9d483217595'
    },
    name: 'Mock ERC20 Token',
    symbol: 'TEST'
  }
];
