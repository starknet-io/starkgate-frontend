import PropTypes from 'prop-types';
import React from 'react';

import {Breakpoints} from '../../../enums';
import {useColors, useWindowSize} from '../../../hooks';
import {shortenAddress} from '../../../utils';
import {Button, DynamicIcon} from '../index';
import {WALLET_LOGO_SIZE, WALLET_BTN_WIDTH, WALLET_BTN_WIDTH_S} from './WalletButton.constants';
import {BTN_TXT} from './WalletButton.strings';

export const WalletButton = ({account, logoPath, onClick}) => {
  const {colorBeta, colorWhite} = useColors();
  const windowSize = useWindowSize();

  return (
    <Button
      colorBackground="transparent"
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={40}
      icon={<DynamicIcon path={logoPath} size={WALLET_LOGO_SIZE} />}
      style={{borderWidth: '2px'}}
      text={BTN_TXT(shortenAddress(account))}
      width={Breakpoints.smallScreens(windowSize) ? WALLET_BTN_WIDTH_S : WALLET_BTN_WIDTH}
      onClick={onClick}
    />
  );
};

WalletButton.propTypes = {
  account: PropTypes.string,
  logoPath: PropTypes.string,
  onClick: PropTypes.func
};
