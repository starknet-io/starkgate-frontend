import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import {formatAddress} from '../../../utils';
import {Button, DynamicIcon} from '../index';
import {WALLET_LOGO_SIZE} from './WalletButton.constants';
import {BTN_TXT} from './WalletButton.strings';

export const WalletButton = ({account, logoPath, onClick}) => {
  const {colorBeta, colorWhite} = useColors();

  return (
    <Button
      colorBackground="transparent"
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={40}
      icon={<DynamicIcon path={logoPath} size={WALLET_LOGO_SIZE} />}
      style={{borderWidth: '2px'}}
      text={BTN_TXT(formatAddress(account))}
      onClick={onClick}
    />
  );
};

WalletButton.propTypes = {
  account: PropTypes.string,
  logoPath: PropTypes.string,
  onClick: PropTypes.func
};
