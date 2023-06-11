import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {isDeposit, isWithdrawal} from '@starkgate/shared';
import {NetworkType} from '@starkware-webapps/enums';

import {TransferContext} from './transfer-context';
import {actions, initialState, reducer} from './transfer-reducer';

export const TransferProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isL1 = isDeposit(state.action);
  const isL2 = isWithdrawal(state.action);
  const fromNetwork = isL1 ? NetworkType.L1 : NetworkType.L2;
  const toNetwork = isL1 ? NetworkType.L2 : NetworkType.L1;
  const amount = isL1 ? state.transferToL2Amount : state.transferToL1Amount;

  const setBridgeIsFull = bridgeIsFull => {
    dispatch({
      type: actions.SET_BRIDGE_IS_FULL,
      bridgeIsFull
    });
  };

  const setTransferType = TransferType => {
    dispatch({
      type: actions.SET_ACTION_TYPE,
      TransferType
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

  const setAutoWithdrawal = autoWithdrawal => {
    dispatch({
      type: actions.SET_AUTO_WITHDRAWAL,
      autoWithdrawal
    });
  };

  const setFastWithdrawal = fastWithdrawal => {
    dispatch({
      type: actions.SET_FAST_WITHDRAWAL,
      fastWithdrawal
    });
  };

  const value = {
    ...state,
    setAmount,
    selectToken,
    setTransferType,
    setBridgeIsFull,
    setAutoWithdrawal,
    setFastWithdrawal,
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
