import {LinearProgress} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {RefreshWarningMessage} from '../ModalMessage';
import {ModalText} from '../ModalText/ModalText';

const ProgressModal = ({message, component}) => {
  return (
    <>
      <LinearProgress />
      <ModalText>{message}</ModalText>
      <br />
      {component}
      <br />
      <RefreshWarningMessage />
    </>
  );
};

ProgressModal.propTypes = {
  message: PropTypes.string,
  component: PropTypes.func
};

export default ProgressModal;
