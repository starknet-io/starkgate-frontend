import PropTypes from 'prop-types';
import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {Breakpoint, isDesktop, isMobile, isMobileOrTablet} from '../../../enums';
import {useColors, useHeaderTranslation} from '../../../hooks';
import {evaluate, shortenAddress, toClasses} from '../../../utils';
import {Button, DynamicIcon} from '../index';
import styles from './WalletButton.module.scss';

const WALLET_LOGO_SIZE = 30;
const WALLET_LOGO_SIZE_MOBILE = 40;

export const WalletButton = ({account, logoPath, onClick}) => {
  const {colorBeta, colorWhite, colorWhiteOp10, colorWhiteOp20} = useColors();
  const {walletBtnTxt} = useHeaderTranslation();
  const {breakpoint} = useBreakpoint(Breakpoint);

  const getText = () => {
    const address = shortenAddress(account);
    if (isMobileOrTablet(breakpoint)) {
      return '';
    } else if (!isDesktop(breakpoint)) {
      return address;
    }
    return evaluate(walletBtnTxt, {address});
  };

  const renderWalletLogo = () => {
    const logoSize = isMobile(breakpoint) ? WALLET_LOGO_SIZE_MOBILE : WALLET_LOGO_SIZE;
    return <DynamicIcon path={logoPath} size={logoSize} />;
  };

  return (
    <Button
      className={toClasses(styles.walletButton, styles[breakpoint.toLowerCase()])}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorWhiteOp20}
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={0}
      icon={renderWalletLogo()}
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
