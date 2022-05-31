import {LinearProgress} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {RefreshMessage} from '../ModalMessage';
import {ModalText} from '../ModalText/ModalText';
import styles from './ProgressModal.module.scss';

const ProgressModal = ({message}) => {
  return (
    <div className={styles.progressModal}>
      <LinearProgress />
      <ModalText>{message}</ModalText>
      <RefreshMessage />
    </div>
  );
};

ProgressModal.propTypes = {
  message: PropTypes.string
};

export default ProgressModal;
