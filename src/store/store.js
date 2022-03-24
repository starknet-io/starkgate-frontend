import {configureStore} from '@reduxjs/toolkit';

import modal from '../components/Features/ModalProvider/ModalProvider.slice';
import transfer from '../components/Features/Transfer/Transfer.slice';

export const store = configureStore({
  reducer: {
    modal,
    transfer
  }
});
