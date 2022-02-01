import {createSelector} from '@reduxjs/toolkit';

import {ActionType, NetworkType} from '../../../enums';

export const selectTransfer = state => state.transfer;

export const selectTransferAction = state => state.transfer.action;

export const selectSymbol = state => state.transfer.symbol;

export const selectTransferToL1Amount = state => state.transfer.transferToL1Amount;

export const selectTransferToL2Amount = state => state.transfer.transferToL2Amount;

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
  [selectTransferAction, selectTransferToL2Amount, selectTransferToL1Amount],
  (action, transferToL2Amount, transferToL1Amount) => {
    if (action === ActionType.TRANSFER_TO_L2) {
      return transferToL2Amount;
    }
    return transferToL1Amount;
  }
);
