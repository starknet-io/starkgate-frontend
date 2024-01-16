import {ChainTypeL1, ChainTypeL2} from './ChainType';

export type IChainInfo = {
  NAME: string;
  EXPLORER_URL: string;
  CHAIN?: string;
  DISABLED?: boolean;
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
    },
    [ChainTypeL1.SEPOLIA]: {
      NAME: 'Ethereum Sepolia',
      EXPLORER_URL: 'https://sepolia.etherscan.io'
    }
  },
  L2: {
    [ChainTypeL2.MAIN]: {
      CHAIN: 'Mainnet',
      NAME: 'Starknet Mainnet',
      EXPLORER_URL: 'https://starkscan.co'
    },
    [ChainTypeL2.GOERLI]: {
      CHAIN: 'Goerli',
      NAME: 'Starknet Goerli',
      EXPLORER_URL: 'https://testnet.starkscan.co'
    },
    [ChainTypeL2.SEPOLIA]: {
      CHAIN: 'Sepolia',
      NAME: 'Starknet Sepolia',
      EXPLORER_URL: 'https://sepolia.starkscan.co',
      DISABLED: true
    }
  }
};
