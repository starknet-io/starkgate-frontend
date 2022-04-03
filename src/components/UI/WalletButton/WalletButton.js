import PropTypes from 'prop-types';
import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {isMobile, isTablet, Breakpoint} from '../../../enums';
import {useColors} from '../../../hooks';
import utils from '../../../utils';
import {toClasses} from '../../../utils/object';
import {Button, DynamicIcon} from '../index';
import {WALLET_LOGO_SIZE, WALLET_LOGO_SIZE_MOBILE} from './WalletButton.constants';
import styles from './WalletButton.module.scss';
import {BTN_TXT} from './WalletButton.strings';

export const WalletButton = ({account, logoPath, onClick}) => {
  const {colorBeta, colorWhite, colorWhiteOp10, colorWhiteOp20} = useColors();
  const {breakpoint} = useBreakpoint(Breakpoint);

  const getText = () => {
    const address = utils.wallet.shortenAddress(account);
    if (isTablet(breakpoint)) {
      return address;
    } else if (isMobile(breakpoint)) {
      return '';
    }
    return BTN_TXT(address);
  };

  return (
    <Button
      className={toClasses(styles.walletButton, styles[breakpoint.toLowerCase()])}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorWhiteOp20}
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={0}
      icon={
        <DynamicIcon
          path={logoPath}
          size={isMobile(breakpoint) ? WALLET_LOGO_SIZE_MOBILE : WALLET_LOGO_SIZE}
        />
      }
      text={getText()}
      onClick={onClick}
    />
  );
};

WalletButton.propTypes = {
  account: PropTypes.string,
  logoPath: PropTypes.string,
  onClick: PropTypes.func
};
