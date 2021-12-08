import {configureStore} from '@reduxjs/toolkit';

import bridge from '../components/Features/Bridge/Bridge.slice';
import modal from '../components/Features/ModalProvider/ModalProvider/ModalProvider.slice';
import transfer from '../components/Features/Transfer/Transfer/Transfer.slice';

export const store = configureStore({
  reducer: {
    bridge,
    modal,
    transfer
  }
});
