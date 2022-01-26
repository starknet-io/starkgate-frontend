import {createSlice} from '@reduxjs/toolkit';

import {ActionType} from '../../../enums';

const initialState = {
  action: ActionType.TRANSFER_TO_L2,
  symbol: '',
  transferToL2Amount: '',
  transferToL1Amount: ''
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferAction(state, action) {
      state.action = action.payload;
    },
    selectTokenAction(state, action) {
      state.symbol = action.payload;
    },
    setAmountAction(state, action) {
      if (state.action === ActionType.TRANSFER_TO_L2) {
        state.transferToL2Amount = action.payload;
      } else {
        state.transferToL1Amount = action.payload;
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
