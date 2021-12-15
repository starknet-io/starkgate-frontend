import {EthereumTokens, StarknetTokens} from '../../config/addresses';
import {NetworkType} from '../../enums';

export const actions = {
  UPDATE_ETHEREUM_TOKEN_STATE: 'Tokens/UPDATE_ETHEREUM_TOKEN_STATE',
  UPDATE_STARKNET_TOKEN_STATE: 'Tokens/UPDATE_STARKNET_TOKEN_STATE'
};

function getUpdatedTokens(tokens, payload) {
  const {index, args} = payload;
  const tokenData = {...tokens[index], ...args};
  const tokensCopy = [...tokens];
  tokensCopy[index] = tokenData;
  return tokensCopy;
}

export const initialState = {
  ethereumTokens: [NetworkType.ETHEREUM, ...EthereumTokens],
  starknetTokens: StarknetTokens
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_ETHEREUM_TOKEN_STATE: {
      return {
        ...state,
        ethereumTokens: getUpdatedTokens(state.ethereumTokens, action.payload)
      };
    }

    case actions.UPDATE_STARKNET_TOKEN_STATE: {
      return {
        ...state,
        starknetTokens: getUpdatedTokens(state.starknetTokens, action.payload)
      };
    }

    default:
      return state;
  }
};
