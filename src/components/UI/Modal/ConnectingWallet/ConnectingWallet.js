import {LinearProgress} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {ModalText} from '../ModalText/ModalText';
import styles from './ConnectingWallet.module.scss';

const ConnectingWallet = ({message}) => {
  return (
    <>
      <LinearProgress />
      <br />
      <ModalText>{message[0]}</ModalText>
      <br />
      <div className={styles.bottomMessage}>
        <span>{message[1]}</span>
        <b>{message[2]}</b>
      </div>
    </>
  );
};

ConnectingWallet.propTypes = {
  message: PropTypes.array
};

export default ConnectingWallet;
