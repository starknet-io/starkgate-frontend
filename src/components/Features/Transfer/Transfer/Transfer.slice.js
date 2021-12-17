import {createSlice} from '@reduxjs/toolkit';

import {ActionType} from '../../../../enums';

const initialState = {
  action: ActionType.TRANSFER_TO_STARKNET,
  selectedEthereumToken: null,
  selectedStarknetToken: null,
  depositAmount: '',
  withdrawAmount: ''
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferAction(state, action) {
      state.action = action.payload;
    },
    selectTokenAction(state, action) {
      const {selectedStarknetToken, selectedEthereumToken} = action.payload;
      state.selectedEthereumToken = selectedEthereumToken;
      state.selectedStarknetToken = selectedStarknetToken;
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
