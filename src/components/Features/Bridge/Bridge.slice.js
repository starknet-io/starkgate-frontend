import {createSlice} from '@reduxjs/toolkit';

import {MenuType} from '../../../enums';

const initialState = {
  menu: MenuType.TRANSFER,
  menuProps: {
    transferId: null
  }
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    showMenuAction(state, action) {
      state.menu = action.payload.menu;
      if (!action.payload.menuProps || !action.payload.menuProps.transferId) {
        state.menuProps = {
          transferId: null
        };
      } else {
        state.menuProps = action.payload.menuProps;
      }
    }
  }
});

export const {showMenuAction, resetAction} = bridgeSlice.actions;

export default bridgeSlice.reducer;
