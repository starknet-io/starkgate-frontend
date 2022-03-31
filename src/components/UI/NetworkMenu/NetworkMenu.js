import PropTypes from 'prop-types';
import React from 'react';

import {NetworkTitle} from '../NetworkTitle/NetworkTitle';
import {RefreshButton} from '../RefreshButton/RefreshButton';
import {TokenBalance} from '../TokenBalance/TokenBalance';
import {Badge} from '../index';
import styles from './NetworkMenu.module.scss';
import {FROM, TO} from './NetworkMenu.strings';

export const NetworkMenu = ({networkData, tokenData, isTarget, onRefresh, children}) => {
  return (
    <div className={styles.networkMenu}>
      <Badge text={isTarget ? TO : FROM} />
      <div className={styles.networkContainer}>
        <NetworkTitle networkData={networkData} />
        <TokenBalance tokenData={tokenData} onRefresh={onRefresh} />
      </div>
      <div className={styles.transferContainer}>{children}</div>
    </div>
  );
};

NetworkMenu.propTypes = {
  networkData: PropTypes.object,
  tokenData: PropTypes.object,
  isTarget: PropTypes.bool,
  onRefresh: PropTypes.func,
  children: PropTypes.any
};
