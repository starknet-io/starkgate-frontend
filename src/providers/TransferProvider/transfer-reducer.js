import {ActionType} from '../../enums';

export const actions = {
  SET_ACTION_TYPE: 'Transfer/SET_ACTION_TYPE',
  SELECT_TOKEN: 'Transfer/SELECT_TOKEN',
  SET_AMOUNT: 'Transfer/SET_AMOUNT'
};

export const initialState = {
  action: ActionType.TRANSFER_TO_L2,
  symbol: '',
  transferToL2Amount: '',
  transferToL1Amount: ''
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_ACTION_TYPE: {
      return {
        ...state,
        action: action.actionType
      };
    }

    case actions.SELECT_TOKEN: {
      return {
        ...state,
        symbol: action.symbol
      };
    }

    case actions.SET_AMOUNT: {
      if (state.action === ActionType.TRANSFER_TO_L2) {
        return {
          ...state,
          transferToL2Amount: action.amount
        };
      }
      return {
        ...state,
        transferToL1Amount: action.amount
      };
    }

    default:
      return state;
  }
};
