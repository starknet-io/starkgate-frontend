import {createSlice} from '@reduxjs/toolkit';

import {MenuType} from '../../../enums';

const initialState = {
  menu: MenuType.TRANSFER,
  menuProps: {
    [MenuType.ACCOUNT]: {transferId: null}
  }
};

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    showMenuAction(state, action) {
      state.menu = action.payload.menu;
      state.menuProps = {
        [action.payload.menu]: action.payload.menuProps
      };
    },
    resetMenuPropsAction(state) {
      state.menuProps[state.menu] = initialState.menuProps[state.menu];
    }
  }
});

export const {showMenuAction, resetAction, resetMenuPropsAction} = bridgeSlice.actions;

export default bridgeSlice.reducer;
