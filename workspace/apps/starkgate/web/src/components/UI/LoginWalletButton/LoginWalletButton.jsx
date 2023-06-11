import React from 'react';

import {useConnectWalletTracking, useTransferTranslation} from '@hooks';
import {useLoginModal, useWalletsStatus} from '@providers';
import {NetworkType, isConnected} from '@starkware-webapps/enums';
import {MainMenuButton} from '@ui';

export const LoginWalletButton = props => {
  const {statusL1} = useWalletsStatus();
  const {loginWalletButtonTxt} = useTransferTranslation();
  const showLoginModal = useLoginModal();
  const [trackConnectWalletClick] = useConnectWalletTracking();

  const handleConnectWallets = () => {
    const networkName = isConnected(statusL1) ? NetworkType.L2 : NetworkType.L1;
    trackConnectWalletClick();
    showLoginModal(networkName);
  };

  return <MainMenuButton text={loginWalletButtonTxt} onClick={handleConnectWallets} {...props} />;
};
