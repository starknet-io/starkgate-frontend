import {LinearProgress} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {RefreshMessage} from '../ModalMessage';
import {ModalText} from '../ModalText/ModalText';

const ConnectingWallet = ({message}) => {
  return (
    <>
      <LinearProgress />
      <br />
      <ModalText>{message}</ModalText>
      <br />
      <RefreshMessage />
    </>
  );
};

ConnectingWallet.propTypes = {
  message: PropTypes.string
};

export default ConnectingWallet;
