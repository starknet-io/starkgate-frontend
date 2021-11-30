import {createSlice} from '@reduxjs/toolkit';

import {MenuType} from '../../../enums';

const initialState = {
  menu: MenuType.TRANSFER
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    showMenuAction(state, action) {
      state.menu = action.payload;
    }
  }
});

export const {showMenuAction, setTokensAction, resetAction} = bridgeSlice.actions;

export default bridgeSlice.reducer;
