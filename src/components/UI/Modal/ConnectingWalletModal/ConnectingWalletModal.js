import PropTypes from 'prop-types';
import React from 'react';

import {DynamicIcon} from '../../DynamicIcon/DynamicIcon';
import {LoginMessage} from '../ModalMessage';
import {WithLoaderModal} from '../WithLoaderModal/WithLoaderModal';
import {useConnectingWalletModalTranslation} from '../../../../hooks';

const ConnectingWalletModal = ({walletName, iconPath}) => {
  const {bodyTxtParts} = useConnectingWalletModalTranslation();

  return (
    <WithLoaderModal>
      <center>
        <DynamicIcon path={iconPath} size={100} />
      </center>
      <LoginMessage txtParts={bodyTxtParts} walletName={walletName} />
    </WithLoaderModal>
  );
};

ConnectingWalletModal.propTypes = {
  walletName: PropTypes.string,
  iconPath: PropTypes.string
};

export default ConnectingWalletModal;
