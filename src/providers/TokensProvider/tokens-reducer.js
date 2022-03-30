import envs from '../../config/envs';
import {l1tokens, l2tokens} from '../../config/tokens';

export const actions = {
  UPDATE_TOKEN_STATE: 'Tokens/UPDATE_TOKEN_STATE'
};

export const initialState = [
  ...l1tokens.filter(t => envs.supportedTokens.includes(t.symbol)).map(t => ({...t, isL1: true})),
  ...l2tokens.filter(t => envs.supportedTokens.includes(t.symbol)).map(t => ({...t, isL2: true}))
];

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
