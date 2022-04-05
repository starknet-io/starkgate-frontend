import {LinearProgress} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {RefreshMessage} from '../ModalMessage';
import {ModalText} from '../ModalText/ModalText';

const ProgressModal = ({message, refreshMessage}) => {
  return (
    <>
      <LinearProgress />
      <br />
      <ModalText>{message}</ModalText>
      <br />
      <RefreshMessage message={refreshMessage} />
    </>
  );
};

ProgressModal.propTypes = {
  message: PropTypes.string,
  refreshMessage: PropTypes.string
};

export default ProgressModal;
