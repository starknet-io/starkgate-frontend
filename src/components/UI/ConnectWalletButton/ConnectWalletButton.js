import {NetworkType, WalletStatus} from '@starkware-industries/commons-js-enums';
import React from 'react';

import {useTransferTranslation, useColors} from '../../../hooks';
import {useLoginModal} from '../../../providers/ModalProvider';
import {useWalletsStatus} from '../../../providers/WalletsProvider';
import {toClasses} from '../../../utils';
import {Button} from '../index';
import styles from './LoginWalletsButton.module.scss';

export const LoginWalletsButton = () => {
  const {statusL1} = useWalletsStatus();
  const {connectWalletBtnTxt} = useTransferTranslation();
  const {colorBeta, colorWhite} = useColors();

  const showLoginModal = useLoginModal();

  const handleConnectWallets = () => {
    const networkName = statusL1 === WalletStatus.CONNECTED ? NetworkType.L2 : NetworkType.L1;
    showLoginModal(networkName);
  };

  return (
    <Button
      className={toClasses(styles.loginWalletsButton)}
      colorBackground={colorBeta}
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={50}
      text={connectWalletBtnTxt}
      onClick={handleConnectWallets}
    />
  );
};
