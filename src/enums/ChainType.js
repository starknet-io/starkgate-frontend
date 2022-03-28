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
      NAME: 'main'
    },
    [ChainType.L1.GOERLI]: {
      NAME: 'goerli'
    }
  },
  L2: {
    [ChainType.L2.MAIN]: {
      NAME: 'main',
      ID_PREFIX: '23448594291968334'
    },
    [ChainType.L2.GOERLI]: {
      NAME: 'goerli',
      ID_PREFIX: '1536727068981429685321'
    }
  }
};
