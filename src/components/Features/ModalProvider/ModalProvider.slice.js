import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  show: false,
  componentPath: '',
  componentProps: null,
  withButtons: false,
  body: ''
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalAction(state, action) {
      Object.assign(state, {...action.payload, show: true});
    },
    hideModalAction(state) {
      Object.assign(state, initialState);
    }
  }
});

export const {showModalAction, hideModalAction} = modalSlice.actions;

export default modalSlice.reducer;
