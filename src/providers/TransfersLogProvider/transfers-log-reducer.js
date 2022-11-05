import {v4 as uuidv4} from 'uuid';

export const actions = {
  SET_TRANSFERS: 'TransfersLog/SET_TRANSFERS',
  ADD_TRANSFER: 'TransfersLog/ADD_TRANSFER',
  UPDATE_TRANSFER: 'TransfersLog/UPDATE_TRANSFER'
};

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TRANSFERS:
      return action.transfers;

    case actions.ADD_TRANSFER: {
      const {newTransfer} = action;
      return [{id: uuidv4(), timestamp: new Date().getTime(), ...newTransfer}, ...state];
    }

    case actions.UPDATE_TRANSFER: {
      const {transfer} = action;
      const index = state.findIndex(t => t.id === transfer.id);
      if (index > -1) {
        const transfers = [...state];
        transfers[index] = transfer;
        return transfers;
      }
      return state;
    }

    default:
      return state;
  }
};
