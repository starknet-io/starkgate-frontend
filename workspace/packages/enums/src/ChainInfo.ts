import {ChainTypeL1, ChainTypeL2} from './ChainType';

export type IChainInfo = {
  NAME: string;
  EXPLORER_URL: string;
  CHAIN?: string;
  ID_PREFIX?: string;
};

export type ChainsInfo = {
  L1: {
    [Chain in ChainTypeL1]: IChainInfo;
  };
  L2: {
    [Chain in ChainTypeL2]: IChainInfo;
  };
};

export const ChainInfo: ChainsInfo = {
  L1: {
    [ChainTypeL1.MAIN]: {
      NAME: 'Ethereum Mainnet',
      EXPLORER_URL: 'https://etherscan.io'
    },
    [ChainTypeL1.GOERLI]: {
      NAME: 'Ethereum Goerli',
      EXPLORER_URL: 'https://goerli.etherscan.io'
    }
  },
  L2: {
    [ChainTypeL2.MAIN]: {
      CHAIN: 'Mainnet',
      NAME: 'Starknet Mainnet',
      ID_PREFIX: '23448594291968334',
      EXPLORER_URL: 'https://starkscan.co'
    },
    [ChainTypeL2.GOERLI]: {
      CHAIN: 'Goerli',
      NAME: 'Starknet Goerli',
      ID_PREFIX: '1536727068981429685321',
      EXPLORER_URL: 'https://testnet.starkscan.co'
    }
  }
};
