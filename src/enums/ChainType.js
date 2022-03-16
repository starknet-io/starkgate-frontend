import constants from '../config/constants';

const {ETHERSCAN_URL, VOYAGER_URL} = constants;

export const ChainType = {
  MAIN: {
    id: 1,
    name: 'main',
    blockExplorerUrl: `https://${ETHERSCAN_URL}`,
    l2Id: 'SN_MAIN',
    l2IdPrefix: '23448594291968334',
    l2BlockExplorerUrl: `https://${VOYAGER_URL}`
  },
  GOERLI: {
    id: 5,
    name: 'goerli',
    blockExplorerUrl: `https://goerli.${ETHERSCAN_URL}`,
    l2Id: 'SN_GOERLI',
    l2IdPrefix: '1536727068981429685321',
    l2BlockExplorerUrl: `https://goerli.${VOYAGER_URL}`
  }
};

export const byChainId = id => {
  const key = Object.keys(ChainType).find(key => ChainType[key].id === id);
  return ChainType[key];
};

export const toChainName = id => {
  const chainData = byChainId(id);
  return chainData?.name || '';
};
