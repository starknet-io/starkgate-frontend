import {WalletStatus} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {NetworkTitle} from '../NetworkTitle/NetworkTitle';
import {TokenBalance} from '../TokenBalance/TokenBalance';
import {Badge} from '../index';
import styles from './NetworkMenu.module.scss';

export const NetworkMenu = ({
  networkName,
  tokenData,
  isTarget,
  isDisabled,
  status,
  onRefreshClick,
  children
}) => {
  const {toTxt, fromTxt} = useTransferTranslation();

  return (
    <div className={styles.networkMenu}>
      <Badge isDisabled={isDisabled} text={isTarget ? toTxt : fromTxt} />
      <div className={styles.networkContainer}>
        <NetworkTitle isDisabled={isDisabled} networkName={networkName} />
        {status === WalletStatus.CONNECTED && (
          <TokenBalance
            isDisabled={isDisabled}
            tokenData={tokenData}
            onRefreshClick={onRefreshClick}
          />
        )}
      </div>
      <div className={styles.transferContainer}>{children}</div>
    </div>
  );
};

NetworkMenu.propTypes = {
  networkName: PropTypes.string,
  tokenData: PropTypes.object,
  isTarget: PropTypes.bool,
  isDisabled: PropTypes.bool,
  status: PropTypes.string,
  onRefreshClick: PropTypes.func,
  children: PropTypes.any
};
