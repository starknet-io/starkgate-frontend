import {ETHERSCAN_URL, VOYAGER_URL} from '../constants';

export const ChainType = {
  MAIN: {
    id: 1,
    name: 'main',
    blockExplorerUrl: `https://${ETHERSCAN_URL}`,
    starknetId: 'SN_MAIN',
    starknetIdPrefix: '23448594291968334',
    starknetBlockExplorerUrl: `https://${VOYAGER_URL}`
  },
  GOERLI: {
    id: 5,
    name: 'goerli',
    blockExplorerUrl: `https://goerli.${ETHERSCAN_URL}`,
    starknetId: 'SN_GOERLI',
    starknetIdPrefix: '1536727068981429685321',
    starknetBlockExplorerUrl: `https://goerli.${VOYAGER_URL}`
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
