import {createSelector} from '@reduxjs/toolkit';

import {ActionType, NetworkType} from '../../../enums';

export const selectTransfer = state => state.transfer;

export const selectTransferAction = state => state.transfer.action;

export const selectSymbol = state => state.transfer.symbol;

export const selectWithdrawAmount = state => state.transfer.withdrawAmount;

export const selectDepositAmount = state => state.transfer.depositAmount;

export const toL2Selector = createSelector(
  selectTransferAction,
  action => action === ActionType.TRANSFER_TO_L2
);

export const toL1Selector = createSelector(
  selectTransferAction,
  action => action === ActionType.TRANSFER_TO_L1
);

export const fromNetworkSelector = createSelector(selectTransferAction, action =>
  action === ActionType.TRANSFER_TO_L2 ? NetworkType.L1 : NetworkType.L2
);

export const toNetworkSelector = createSelector(selectTransferAction, action =>
  action === ActionType.TRANSFER_TO_L2 ? NetworkType.L2 : NetworkType.L1
);

export const getCurrentAmountSelector = createSelector(
  [selectTransferAction, selectDepositAmount, selectWithdrawAmount],
  (action, depositAmount, withdrawAmount) => {
    if (action === ActionType.TRANSFER_TO_L2) {
      return depositAmount;
    }
    return withdrawAmount;
  }
);
