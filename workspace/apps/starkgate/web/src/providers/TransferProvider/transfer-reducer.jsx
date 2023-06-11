import {TransferType, isDeposit} from '@starkgate/shared';

export const actions = {
  SET_ACTION_TYPE: 'Transfer/SET_ACTION_TYPE',
  SELECT_TOKEN: 'Transfer/SELECT_TOKEN',
  SET_AMOUNT: 'Transfer/SET_AMOUNT',
  SET_BRIDGE_IS_FULL: 'Transfer/SET_BRIDGE_IS_FULL',
  SET_AUTO_WITHDRAWAL: 'Transfer/SET_AUTO_WITHDRAWAL',
  SET_FAST_WITHDRAWAL: 'Transfer/SET_FAST_WITHDRAWAL'
};

export const initialState = {
  action: TransferType.DEPOSIT,
  symbol: '',
  transferToL2Amount: '',
  transferToL1Amount: '',
  bridgeIsFull: false,
  autoWithdrawal: false,
  fastWithdrawal: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_ACTION_TYPE: {
      return {
        ...state,
        action: action.TransferType
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
      if (isDeposit(state.action)) {
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

    case actions.SET_AUTO_WITHDRAWAL: {
      return {
        ...state,
        autoWithdrawal: action.autoWithdrawal
      };
    }

    case actions.SET_FAST_WITHDRAWAL: {
      return {
        ...state,
        fastWithdrawal: action.fastWithdrawal
      };
    }

    default:
      return state;
  }
};
