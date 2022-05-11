import {ActionType} from '../../enums';

export const actions = {
  SET_ACTION_TYPE: 'Transfer/SET_ACTION_TYPE',
  SELECT_TOKEN: 'Transfer/SELECT_TOKEN',
  SET_AMOUNT: 'Transfer/SET_AMOUNT',
  SET_IS_FAST_TRANSFER_TO_L1: 'Transfer/SET_IS_FAST_TRANSFER_TO_L1'
};

export const initialState = {
  action: ActionType.TRANSFER_TO_L2,
  symbol: '',
  transferToL2Amount: '',
  transferToL1Amount: '',
  isFastTransferToL1Available: false,
  isFastTransferToL1: false
};

function addIsFastTransferToL1Available(state) {
  const {symbol, action} = state;
  const isFastTransferToL1Available = symbol === 'DAI' && action === ActionType.TRANSFER_TO_L1;
  console.log({symbol, action, isFastTransferToL1Available});
  return {...state, isFastTransferToL1Available};
}

export const reducer = (state, action) => {
  console.log(action, {action: state.action});
  switch (action.type) {
    case actions.SET_ACTION_TYPE: {
      return addIsFastTransferToL1Available({
        ...state,
        action: action.actionType
      });
    }

    case actions.SELECT_TOKEN: {
      return addIsFastTransferToL1Available({
        ...state,
        symbol: action.symbol
      });
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

    case actions.SET_IS_FAST_TRANSFER_TO_L1: {
      if (state.isFastTransferToL1Available) {
        return {
          ...state,
          isFastTransferToL1: action.isFastTransferToL1
        };
      }
      return state;
    }

    default:
      return state;
  }
};
