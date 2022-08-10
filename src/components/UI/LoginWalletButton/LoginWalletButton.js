import {NetworkType, WalletStatus} from '@starkware-industries/commons-js-enums';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {useLoginModal} from '../../../providers/ModalProvider';
import {useWalletsStatus} from '../../../providers/WalletsProvider';
import {MainMenuButton} from '../MainMenuButton/MainMenuButton';

export const LoginWalletButton = props => {
  const {statusL1} = useWalletsStatus();
  const {loginWalletButtonTxt} = useTransferTranslation();
  const showLoginModal = useLoginModal();

  const handleConnectWallets = () => {
    const networkName = statusL1 === WalletStatus.CONNECTED ? NetworkType.L2 : NetworkType.L1;
    showLoginModal(networkName);
  };

  return <MainMenuButton text={loginWalletButtonTxt} onClick={handleConnectWallets} {...props} />;
};
