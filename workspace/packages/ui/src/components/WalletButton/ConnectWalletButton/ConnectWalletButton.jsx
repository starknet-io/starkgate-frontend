import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useTranslation} from '@hooks';
import {WalletStatus} from '@starkware-webapps/enums';
import {evaluate} from '@starkware-webapps/utils';
import {toClasses} from '@starkware-webapps/utils-browser';

import {Button} from '../../Button/Button';
import styles from './ConnectWalletButton.module.scss';

export const ConnectWalletButton = ({network, status, texts, onClick}) => {
  const {colorOrangeSoda, colorFlame, colorWhite} = useColors();
  const {CONNECT_TXT, CONNECTING_TXT} = useTranslation('WalletButton', texts);

  return (
    <Button
      className={toClasses(styles.connectWalletButton, styles[status])}
      colorBackground={colorOrangeSoda}
      colorBackgroundHover={colorFlame}
      colorText={colorWhite}
      text={status === WalletStatus.CONNECTING ? CONNECTING_TXT : evaluate(CONNECT_TXT, {network})}
      onClick={onClick}
    />
  );
};

ConnectWalletButton.propTypes = {
  network: PropTypes.string,
  status: PropTypes.string,
  texts: PropTypes.object,
  onClick: PropTypes.func
};
