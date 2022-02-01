import {createSlice} from '@reduxjs/toolkit';

import {MenuType} from '../../../enums';

const initialState = {
  menu: MenuType.TRANSFER,
  menuProps: null
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    showMenuAction(state, action) {
      state.menu = action.payload.type;
      state.menuProps = action.payload.menuProps;
    }
  }
});

export const {showMenuAction, resetAction} = bridgeSlice.actions;

export default bridgeSlice.reducer;
