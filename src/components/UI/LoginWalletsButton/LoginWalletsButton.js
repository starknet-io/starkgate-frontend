import React from 'react';

import {useTransferTranslation, useColors} from '../../../hooks';
import {toClasses} from '../../../utils';
import {Button} from '../index';
import styles from './LoginWalletsButton.module.scss';

export const LoginWalletsButton = () => {
  const {connectWalletBtnTxt} = useTransferTranslation();
  const {colorBeta, colorWhite} = useColors();
  const handleConnectWallets = () => {
    // TODO
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
