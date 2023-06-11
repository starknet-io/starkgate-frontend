import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {ModalContext} from './modal-context';
import {actions, initialState, reducer} from './modal-reducer';

export const ModalProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showModal = payload => {
    hideModal();
    dispatch({
      type: actions.SHOW_MODAL,
      payload
    });
  };

  const hideModal = () => {
    dispatch({
      type: actions.HIDE_MODAL
    });
  };

  const value = {
    ...state,
    showModal,
    hideModal
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

ModalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
