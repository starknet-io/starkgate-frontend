import {ActionType, NetworkType} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {TransferContext} from './transfer-context';
import {actions, initialState, reducer} from './transfer-reducer';

export const TransferProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isL1 = state.action === ActionType.TRANSFER_TO_L2;
  const isL2 = state.action === ActionType.TRANSFER_TO_L1;
  const fromNetwork = state.action === ActionType.TRANSFER_TO_L2 ? NetworkType.L1 : NetworkType.L2;
  const toNetwork = state.action === ActionType.TRANSFER_TO_L2 ? NetworkType.L2 : NetworkType.L1;
  const amount =
    state.action === ActionType.TRANSFER_TO_L2
      ? state.transferToL2Amount
      : state.transferToL1Amount;

  const setBridgeIsFull = bridgeIsFull => {
    dispatch({
      type: actions.SET_BRIDGE_IS_FULL,
      bridgeIsFull
    });
  };

  const setActionType = actionType => {
    dispatch({
      type: actions.SET_ACTION_TYPE,
      actionType
    });
  };

  const selectToken = symbol => {
    dispatch({
      type: actions.SELECT_TOKEN,
      symbol
    });
  };

  const setAmount = amount => {
    dispatch({
      type: actions.SET_AMOUNT,
      amount
    });
  };

  const value = {
    ...state,
    setAmount,
    selectToken,
    setActionType,
    setBridgeIsFull,
    isL1,
    isL2,
    toNetwork,
    fromNetwork,
    amount
  };

  return <TransferContext.Provider value={value}>{children}</TransferContext.Provider>;
};

TransferProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
