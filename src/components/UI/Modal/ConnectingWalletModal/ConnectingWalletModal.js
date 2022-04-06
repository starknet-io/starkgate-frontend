import PropTypes from 'prop-types';
import React from 'react';

import {DynamicIcon} from '../../DynamicIcon/DynamicIcon';
import {LoginMessage} from '../ModalMessage';
import {WithLoaderModal} from '../WithLoaderModal/WithLoaderModal';

const ConnectingWalletModal = ({iconPath}) => {
  return (
    <WithLoaderModal>
      <center>
        <DynamicIcon path={iconPath} size={100} />
      </center>
      <LoginMessage />
    </WithLoaderModal>
  );
};

ConnectingWalletModal.propTypes = {
  iconPath: PropTypes.string
};

export default ConnectingWalletModal;
