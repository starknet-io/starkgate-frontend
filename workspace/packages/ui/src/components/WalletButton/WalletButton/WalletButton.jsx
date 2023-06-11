import PropTypes from 'prop-types';
import React from 'react';

import {WalletStatus} from '@starkware-webapps/enums';

import {AccountWalletButton} from '../AccountWalletButton/AccountWalletButton';
import {ConnectWalletButton} from '../ConnectWalletButton/ConnectWalletButton';
import {WalletErrorAlert} from '../WalletErrorAlert/WalletErrorAlert';
import styles from './WalletButton.module.scss';

export const WalletButton = ({
  account,
  chain,
  network,
  logoPath,
  status,
  error,
  menuOptions,
  texts = {},
  onClick
}) => {
  return (
    <div className={styles.walletButton}>
      {status === WalletStatus.CONNECTED ? (
        <AccountWalletButton
          account={account}
          chain={chain}
          logoPath={logoPath}
          menuOptions={menuOptions}
          texts={texts}
          onClick={onClick}
        />
      ) : (
        <ConnectWalletButton network={network} status={status} texts={texts} onClick={onClick} />
      )}
      {status === WalletStatus.ERROR && menuOptions.enable && <WalletErrorAlert error={error} />}
    </div>
  );
};

WalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  network: PropTypes.string,
  logoPath: PropTypes.string,
  status: PropTypes.string,
  error: PropTypes.object,
  menuOptions: PropTypes.object,
  texts: PropTypes.object,
  onClick: PropTypes.func
};
