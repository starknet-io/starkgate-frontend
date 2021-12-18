import {createSelector} from '@reduxjs/toolkit';

import {ActionType, NetworkType} from '../../../../enums';

export const selectTransfer = state => state.transfer;

export const selectTransferAction = state => state.transfer.action;

export const selectSymbol = state => state.transfer.symbol;

export const selectWithdrawAmount = state => state.transfer.withdrawAmount;

export const selectDepositAmount = state => state.transfer.depositAmount;

export const toStarknetSelector = createSelector(
  selectTransferAction,
  action => action === ActionType.TRANSFER_TO_STARKNET
);

export const fromStarknetSelector = createSelector(
  selectTransferAction,
  action => action === ActionType.TRANSFER_FROM_STARKNET
);

export const fromNetworkSelector = createSelector(selectTransferAction, action =>
  action === ActionType.TRANSFER_TO_STARKNET ? NetworkType.ETHEREUM : NetworkType.STARKNET
);

export const toNetworkSelector = createSelector(selectTransferAction, action =>
  action === ActionType.TRANSFER_TO_STARKNET ? NetworkType.STARKNET : NetworkType.ETHEREUM
);

export const getCurrentAmountSelector = createSelector(
  [selectTransferAction, selectDepositAmount, selectWithdrawAmount],
  (action, depositAmount, withdrawAmount) => {
    if (action === ActionType.TRANSFER_TO_STARKNET) {
      return depositAmount;
    }
    return withdrawAmount;
  }
);
