import {L1Tokens, L2Tokens} from '../../config/addresses';

export const actions = {
  UPDATE_TOKEN_STATE: 'Tokens/UPDATE_TOKEN_STATE'
};

const l1Tokens = L1Tokens.map(t => ({...t, isL1: true}));
const l2Tokens = L2Tokens.map(t => ({...t, isL2: true}));
export const initialState = [...l1Tokens, ...l2Tokens];

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
