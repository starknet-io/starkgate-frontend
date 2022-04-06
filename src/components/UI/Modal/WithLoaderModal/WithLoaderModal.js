import {LinearProgress} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {ModalText} from '../ModalText/ModalText';

export const WithLoaderModal = ({message, children}) => {
  return (
    <>
      <LinearProgress />
      <br />
      {message && <ModalText>{message}</ModalText>}
      <br />
      {children}
    </>
  );
};

WithLoaderModal.propTypes = {
  message: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
