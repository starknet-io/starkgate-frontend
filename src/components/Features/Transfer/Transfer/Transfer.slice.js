import {createSlice} from '@reduxjs/toolkit';

import {ActionType, NetworkType} from '../../../../enums';

const initialState = {
  selectedToken: {
    balance: null,
    name: NetworkType.ETHEREUM.name,
    symbol: NetworkType.ETHEREUM.symbol
  },
  action: ActionType.TRANSFER_TO_STARKNET,
  depositAmount: '',
  withdrawAmount: ''
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    selectTokenAction(state, action) {
      state.selectedToken = action.payload;
    },
    setTransferAction(state, action) {
      state.action = action.payload;
    },
    setAmountAction(state, action) {
      if (state.action === ActionType.TRANSFER_TO_STARKNET) {
        state.depositAmount = action.payload;
      } else {
        state.withdrawAmount = action.payload;
      }
    },
    resetAction(state) {
      Object.assign(state, initialState);
    }
  }
});

export const {selectTokenAction, setTransferAction, setAmountAction, resetAction} =
  transferSlice.actions;

export default transferSlice.reducer;
