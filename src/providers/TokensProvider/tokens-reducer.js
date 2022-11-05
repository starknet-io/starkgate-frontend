import {SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID, SUPPORTED_TOKENS} from '../../config/envs';
import Tokens from '../../config/tokens';

export const actions = {
  UPDATE_TOKEN: 'Tokens/UPDATE_TOKEN'
};

const tokens = [
  ...Object.values(Tokens.L1)
    .filter(t => SUPPORTED_TOKENS.includes(t.symbol))
    .map(t => ({
      ...t,
      isL1: true,
      bridgeAddress: t.bridgeAddress?.[SUPPORTED_L1_CHAIN_ID],
      tokenAddress: t.tokenAddress?.[SUPPORTED_L1_CHAIN_ID]
    })),
  ...Object.values(Tokens.L2)
    .filter(t => SUPPORTED_TOKENS.includes(t.symbol))
    .map(t => ({
      ...t,
      isL2: true,
      bridgeAddress: t.bridgeAddress?.[SUPPORTED_L2_CHAIN_ID],
      tokenAddress: t.tokenAddress?.[SUPPORTED_L2_CHAIN_ID]
    }))
].map((t, index) => ({...t, index}));

export const initialState = tokens;

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
