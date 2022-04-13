export const ChainType = {
  L1: {
    MAIN: 1,
    GOERLI: 5
  },
  L2: {
    MAIN: 'SN_MAIN',
    GOERLI: 'SN_GOERLI'
  }
};

export const ChainInfo = {
  L1: {
    [ChainType.L1.MAIN]: {
      NAME: 'Ethereum Mainnet'
    },
    [ChainType.L1.GOERLI]: {
      NAME: 'Goerli Testnet'
    }
  },
  L2: {
    [ChainType.L2.MAIN]: {
      NAME: 'Ethereum Mainnet',
      ID_PREFIX: '23448594291968334'
    },
    [ChainType.L2.GOERLI]: {
      NAME: 'Goerli Testnet',
      ID_PREFIX: '1536727068981429685321'
    }
  }
};
