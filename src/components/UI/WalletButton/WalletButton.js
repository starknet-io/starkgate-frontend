import {WalletStatus} from '@starkware-industries/commons-js-enums';
import {evaluate, shortenAddress, toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {Breakpoint, isDesktop, isMobile, isMobileOrTablet} from '../../../enums';
import {useColors, useHeaderTranslation} from '../../../hooks';
import {Button, DynamicIcon} from '../index';
import styles from './WalletButton.module.scss';

export const WalletButton = ({account, chain, network, logoPath, status, onClick}) => {
  return status === WalletStatus.CONNECTED ? (
    <AccountWalletButton account={account} chain={chain} logoPath={logoPath} onClick={onClick} />
  ) : (
    <ConnectWalletButton network={network} onClick={onClick} />
  );
};

WalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  network: PropTypes.string,
  logoPath: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func
};

const AccountWalletButton = ({account, chain, logoPath, onClick}) => {
  const {breakpoint} = useBreakpoint(Breakpoint);
  const {colorOrangeSoda, colorWhiteOp10, colorWhite, colorDarkBlueGray} = useColors();
  const {accountWalletBtnTxt} = useHeaderTranslation();

  const WALLET_LOGO_SIZE = 20;
  const WALLET_LOGO_SIZE_MOBILE = 40;

  const getText = () => {
    const address = shortenAddress(account);
    if (isMobileOrTablet(breakpoint)) {
      return '';
    } else if (!isDesktop(breakpoint)) {
      return address;
    }
    return evaluate(accountWalletBtnTxt, {address});
  };

  const renderChainLabel = () => {
    return isDesktop(breakpoint) ? <ChainLabel chain={chain} /> : null;
  };

  const renderWalletLogo = () => {
    const logoSize = isMobile(breakpoint) ? WALLET_LOGO_SIZE_MOBILE : WALLET_LOGO_SIZE;
    return <DynamicIcon path={logoPath} size={logoSize} />;
  };

  return (
    <Button
      className={toClasses(styles.accountWalletButton, styles[breakpoint.toLowerCase()])}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorDarkBlueGray}
      colorBorder={colorOrangeSoda}
      colorText={colorWhite}
      iconLeft={renderWalletLogo()}
      iconRight={renderChainLabel()}
      text={getText()}
      onClick={onClick}
    />
  );
};

AccountWalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  logoPath: PropTypes.string,
  onClick: PropTypes.func
};

const ConnectWalletButton = ({onClick, network}) => {
  const {colorOrangeSoda, colorFlame, colorWhite} = useColors();
  const {connectWalletBtnTxt} = useHeaderTranslation();
  return (
    <Button
      className={styles.connectWalletButton}
      colorBackground={colorOrangeSoda}
      colorBackgroundHover={colorFlame}
      colorText={colorWhite}
      text={evaluate(connectWalletBtnTxt, {network})}
      onClick={onClick}
    />
  );
};

ConnectWalletButton.propTypes = {
  onClick: PropTypes.func,
  network: PropTypes.string
};

const ChainLabel = ({chain}) => {
  return <div className={styles.networkLabel}>{chain}</div>;
};

ChainLabel.propTypes = {
  chain: PropTypes.string
};
