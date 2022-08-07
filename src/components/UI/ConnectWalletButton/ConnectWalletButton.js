import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {MainMenuButton} from '../index';

export const ConnectWalletButton = props => {
  const {connectWalletBtnTxt} = useTransferTranslation();
  const handleConnectWallets = () => {
    // TODO
  };

  return <MainMenuButton text={connectWalletBtnTxt} onClick={handleConnectWallets} {...props} />;
};
