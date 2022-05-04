export const actions = {
  UPDATE_TOKEN: 'Tokens/UPDATE_TOKEN',
  SET_TOKENS: 'Tokens/SET_TOKENS'
};

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TOKENS: {
      return action.tokens;
    }

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
