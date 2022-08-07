import React from 'react';

import {useTransferTranslation, useColors} from '../../../hooks';
import {MainWalletButton} from '../index';

export const LoginWalletsButton = props => {
  const {connectWalletBtnTxt} = useTransferTranslation();
  const handleConnectWallets = () => {
    // TODO
  };

  return <MainWalletButton text={connectWalletBtnTxt} onClick={handleConnectWallets} {...props} />;
};
