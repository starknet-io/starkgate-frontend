export const ChainType = {
  MAIN: {
    id: 1,
    name: 'main'
  },
  MORDEN: {
    id: 2,
    name: 'morden'
  },
  ROPSTEN: {
    id: 3,
    name: 'ropsten'
  },
  RINKEBY: {
    id: 4,
    name: 'rinkeby'
  },
  GOERLI: {
    id: 5,
    name: 'goerli'
  },
  KOVAN: {
    id: 42,
    name: 'kovan'
  }
};

export const toChainName = id => {
  const key = Object.keys(ChainType).find(key => ChainType[key].id === id);
  return key && ChainType[key].name;
};
