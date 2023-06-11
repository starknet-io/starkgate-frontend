import {createContext} from 'react';

import {initialState} from './modal-reducer';

export const ModalContext = createContext({
  ...initialState,
  showModal: payload => ({payload}),
  hideModal: () => ({})
});
