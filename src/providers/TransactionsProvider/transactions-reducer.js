export const actions = {
  SET_TRANSACTIONS: 'Transactions/SET_TRANSACTIONS',
  ADD_TRANSACTION: 'Transactions/ADD_TRANSACTION'
};

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TRANSACTIONS:
      return action.payload;

    case actions.ADD_TRANSACTION: {
      const tx = action.payload;
      const index = state.findIndex(t => t.id === tx.id);
      if (index > -1) {
        const txs = [...state];
        txs[index] = tx;
        return txs;
      }
      return [action.payload, ...state];
    }

    default:
      return state;
  }
};
