import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useHeaderTranslation} from '@hooks';
import {evaluate, shortenAddress} from '@starkware-webapps/utils';
import {Button, DynamicIcon} from '@ui';

import styles from './WalletButton.module.scss';

export const WalletButtonIconSize = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 30
};

export const WalletButton = ({account, chain, network, logoPath, isConnected, onClick}) => {
  return isConnected ? (
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
  isConnected: PropTypes.bool,
  onClick: PropTypes.func
};

const AccountWalletButton = ({account, chain, logoPath, onClick}) => {
  const {colorOrangeSoda, colorWhiteOp10, colorWhite, colorDarkBlueGray} = useColors();
  const {accountWalletBtnTxt} = useHeaderTranslation();

  return (
    <Button
      className={styles.accountWalletButton}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorDarkBlueGray}
      colorBorder={colorOrangeSoda}
      colorText={colorWhite}
      iconLeft={<DynamicIcon path={logoPath} size={WalletButtonIconSize.MEDIUM} />}
      iconRight={<ChainLabel chain={chain} />}
      text={evaluate(accountWalletBtnTxt, {address: shortenAddress(account)})}
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
