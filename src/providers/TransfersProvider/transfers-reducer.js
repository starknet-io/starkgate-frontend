import {v4 as uuidv4} from 'uuid';

export const actions = {
  SET_TRANSFERS: 'Transfers/SET_TRANSFERS',
  ADD_TRANSFER: 'Transfers/ADD_TRANSFER'
};

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TRANSFERS:
      return action.payload;

    case actions.ADD_TRANSFER: {
      const transfer = action.payload;
      const index = state.findIndex(t => t.id === transfer.id);
      if (index > -1) {
        const transfers = [...state];
        transfers[index] = transfer;
        return transfers;
      }
      return [{id: uuidv4(), timestamp: new Date().getTime(), ...transfer}, ...state];
    }

    default:
      return state;
  }
};
