import {ETH_BRIDGE_CONTRACT_ADDRESS, EthereumTokens, StarknetTokens} from '../../config/addresses';
import {NetworkType} from '../../enums';

export const actions = {
  UPDATE_ETHEREUM_TOKEN_STATE: 'Tokens/UPDATE_ETHEREUM_TOKEN_STATE',
  UPDATE_STARKNET_TOKEN_STATE: 'Tokens/UPDATE_STARKNET_TOKEN_STATE'
};

export const initialState = {
  ethereumTokens: [
    {...NetworkType.ETHEREUM, bridgeAddress: ETH_BRIDGE_CONTRACT_ADDRESS},
    ...EthereumTokens
  ],
  starknetTokens: StarknetTokens
};

const updateTokens = (tokens, payload) => {
  const {index, args} = payload;
  const tokenData = {...tokens[index], ...args};
  const tokensCopy = [...tokens];
  tokensCopy[index] = tokenData;
  return tokensCopy;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_ETHEREUM_TOKEN_STATE: {
      return {
        ...state,
        ethereumTokens: updateTokens(state.ethereumTokens, action.payload)
      };
    }

    case actions.UPDATE_STARKNET_TOKEN_STATE: {
      return {
        ...state,
        starknetTokens: updateTokens(state.starknetTokens, action.payload)
      };
    }

    default:
      return state;
  }
};
