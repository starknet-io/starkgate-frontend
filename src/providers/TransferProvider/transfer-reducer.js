import {ActionType} from '@starkware-industries/starkware-commons-js-enums';

export const actions = {
  SET_ACTION_TYPE: 'Transfer/SET_ACTION_TYPE',
  SELECT_TOKEN: 'Transfer/SELECT_TOKEN',
  SET_AMOUNT: 'Transfer/SET_AMOUNT',
  SET_BRIDGE_IS_FULL: 'Transfer/SET_BRIDGE_IS_FULL'
};

export const initialState = {
  action: ActionType.TRANSFER_TO_L2,
  symbol: '',
  transferToL2Amount: '',
  transferToL1Amount: '',
  bridgeIsFull: false
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

    case actions.SET_BRIDGE_IS_FULL: {
      return {
        ...state,
        bridgeIsFull: action.bridgeIsFull
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
