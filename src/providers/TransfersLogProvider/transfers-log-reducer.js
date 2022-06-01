import {v4 as uuidv4} from 'uuid';

export const actions = {
  SET_TRANSFERS: 'TransfersLog/SET_TRANSFERS',
  ADD_TRANSFER: 'TransfersLog/ADD_TRANSFER',
  UPDATE_TRANSFERS: 'TransfersLog/UPDATE_TRANSFERS'
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

    case actions.UPDATE_TRANSFERS: {
      const {updatedTransfers} = action;
      const transfers = [...state];
      updatedTransfers.forEach(updatedTransfer => {
        const index = transfers.findIndex(t => t.id === updatedTransfer.id);
        if (index > -1) {
          transfers[index] = updatedTransfer;
        }
      });
      return transfers;
    }

    default:
      return state;
  }
};
