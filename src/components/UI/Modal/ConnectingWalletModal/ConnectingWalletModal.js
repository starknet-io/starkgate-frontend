import PropTypes from 'prop-types';
import React from 'react';

import {DynamicIcon} from '../../DynamicIcon/DynamicIcon';
import {LoginMessage} from '../ModalMessage';
import {WithLoaderModal} from '../WithLoaderModal/WithLoaderModal';
import {BODY_TXT_PARTS} from './ConnectingWalletModal.strings';

const ConnectingWalletModal = ({walletName, iconPath}) => {
  return (
    <WithLoaderModal>
      <center>
        <DynamicIcon path={iconPath} size={100} />
      </center>
      <LoginMessage walletName={walletName} txtParts={BODY_TXT_PARTS} />
    </WithLoaderModal>
  );
};

ConnectingWalletModal.propTypes = {
  walletName: PropTypes.string,
  iconPath: PropTypes.string
};

export default ConnectingWalletModal;
