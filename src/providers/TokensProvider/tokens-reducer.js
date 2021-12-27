import {ETH_BRIDGE_CONTRACT_ADDRESS, EthereumTokens, StarknetTokens} from '../../config/addresses';
import {NetworkType} from '../../enums';

export const actions = {
  UPDATE_TOKEN_STATE: 'Tokens/UPDATE_TOKEN_STATE'
};

const ethereumTokens = [
  {
    symbol: NetworkType.ETHEREUM.symbol,
    name: NetworkType.ETHEREUM.tokenName,
    bridgeAddress: ETH_BRIDGE_CONTRACT_ADDRESS
  },
  ...EthereumTokens
].map(t => ({...t, isEthereum: true}));

const starknetTokens = StarknetTokens.map(t => ({...t, isStarknet: true}));

export const initialState = [...ethereumTokens, ...starknetTokens];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_TOKEN_STATE: {
      const {index, args} = action.payload;
      const token = {...state[index], ...args};
      const tokens = [...state];
      tokens[index] = token;
      return tokens;
    }

    default:
      return state;
  }
};
