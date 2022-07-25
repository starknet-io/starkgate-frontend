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
      NAME: 'Ethereum Goerli'
    }
  },
  L2: {
    [ChainType.L2.MAIN]: {
      CHAIN: 'Mainnet',
      NAME: 'StarkNet Mainnet',
      ID_PREFIX: '23448594291968334',
      APP_URL: process.env.REACT_APP_URL_PROD
    },
    [ChainType.L2.GOERLI]: {
      CHAIN: 'Goerli',
      NAME: 'StarkNet Goerli',
      ID_PREFIX: '1536727068981429685321',
      APP_URL: process.env.REACT_APP_URL_GOERLI
    }
  }
};
