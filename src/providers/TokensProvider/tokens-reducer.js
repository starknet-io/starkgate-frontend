import {supportedL1ChainId, supportedL2ChainId, supportedTokens} from '../../config/envs';
import Tokens from '../../config/tokens';

export const actions = {
  UPDATE_TOKEN: 'Tokens/UPDATE_TOKEN'
};

export const initialState = [
  ...Tokens.L1.filter(t => supportedTokens.includes(t.symbol)).map(t => ({
    ...t,
    isL1: true,
    bridgeAddress: t.bridgeAddress?.[supportedL1ChainId],
    tokenAddress: t.tokenAddress?.[supportedL1ChainId]
  })),
  ...Tokens.L2.filter(t => supportedTokens.includes(t.symbol)).map(t => ({
    ...t,
    isL2: true,
    bridgeAddress: t.bridgeAddress?.[supportedL2ChainId],
    tokenAddress: t.tokenAddress?.[supportedL2ChainId]
  }))
];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_TOKEN: {
      const {index, props} = action.payload;
      const newToken = {...state[index], ...props};
      const clonedTokens = [...state];
      clonedTokens[index] = newToken;
      return clonedTokens;
    }

    default:
      return state;
  }
};
