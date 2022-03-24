import {configureStore} from '@reduxjs/toolkit';

import modal from '../components/Features/ModalProvider/ModalProvider.slice';

export const store = configureStore({
  reducer: {
    modal
  }
});
