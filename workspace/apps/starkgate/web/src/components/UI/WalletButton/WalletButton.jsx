import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useHeaderTranslation} from '@hooks';
import {isConnected, isConnecting} from '@starkware-webapps/enums';
import {evaluate, shortenAddress} from '@starkware-webapps/utils';
import {toClasses} from '@starkware-webapps/utils-browser';
import {Button, DynamicIcon} from '@ui';

import styles from './WalletButton.module.scss';

export const WalletButtonIconSize = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 30
};

export const WalletButton = ({account, chain, network, logoPath, status, onClick}) => {
  return isConnected(status) ? (
    <AccountWalletButton account={account} chain={chain} logoPath={logoPath} onClick={onClick} />
  ) : (
    <ConnectWalletButton network={network} status={status} onClick={onClick} />
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

const ConnectWalletButton = ({onClick, network, status}) => {
  const {colorOrangeSoda, colorFlame, colorWhite} = useColors();
  const {connectWalletBtnTxt, connectingWalletBtnTxt} = useHeaderTranslation();
  const connecting = isConnecting(status);

  return (
    <Button
      className={toClasses(styles.connectWalletButton, styles[status])}
      colorBackground={colorOrangeSoda}
      colorBackgroundHover={colorFlame}
      colorText={colorWhite}
      text={evaluate(connecting ? connectingWalletBtnTxt : connectWalletBtnTxt, {network})}
      onClick={onClick}
    />
  );
};

ConnectWalletButton.propTypes = {
  onClick: PropTypes.func,
  network: PropTypes.string,
  status: PropTypes.string
};

const ChainLabel = ({chain}) => {
  return <div className={styles.networkLabel}>{chain}</div>;
};

ChainLabel.propTypes = {
  chain: PropTypes.string
};
