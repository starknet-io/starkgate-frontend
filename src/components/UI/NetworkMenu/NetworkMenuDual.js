import PropTypes from 'prop-types';
import React from 'react';

import {NetworkTitle} from '../NetworkTitle/NetworkTitle';
import {TokenBalance} from '../TokenBalance/TokenBalance';
import {Badge} from '../index';
import {FROM, TO} from './NetworkMenu.strings';
import styles from './NetworkMenuDual.module.scss';

export const NetworkMenuDual = ({
  fromNetworkData,
  fromTokenData,
  toNetworkData,
  toTokenData,
  onRefreshClick,
  children
}) => {
  return (
    <div className={styles.networkMenuDual}>
      <div className={styles.tokensRow}>
        <div>
          <Badge text={FROM} />
          <div className={styles.networkContainer}>
            <NetworkTitle networkData={fromNetworkData} />
            <TokenBalance tokenData={fromTokenData} onRefreshClick={onRefreshClick} />
          </div>
        </div>
        <div>
          <Badge text={TO} />
          <div className={styles.networkContainer}>
            <NetworkTitle networkData={toNetworkData} />
            <TokenBalance tokenData={toTokenData} onRefreshClick={onRefreshClick} />
          </div>
        </div>
      </div>
      <div className={styles.transferContainer}>{children}</div>
    </div>
  );
};

NetworkMenuDual.propTypes = {
  fromNetworkData: PropTypes.object,
  toNetworkData: PropTypes.object,
  fromTokenData: PropTypes.object,
  toTokenData: PropTypes.object,
  onRefreshClick: PropTypes.func,
  children: PropTypes.any
};
