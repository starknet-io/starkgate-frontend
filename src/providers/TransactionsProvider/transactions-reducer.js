export const actions = {
  SET_TRANSACTIONS: 'Transactions/SET_TRANSACTIONS',
  ADD_TRANSACTION: 'Transactions/ADD_TRANSACTION'
};

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TRANSACTIONS:
      return action.payload;

    case actions.ADD_TRANSACTION:
      return [action.payload, ...state];

    default:
      return state;
  }
};
