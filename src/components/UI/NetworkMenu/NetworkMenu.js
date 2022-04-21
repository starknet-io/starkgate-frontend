import PropTypes from 'prop-types';
import React from 'react';

import {useTranslation} from '../../../hooks';
import {NetworkTitle} from '../NetworkTitle/NetworkTitle';
import {TokenBalance} from '../TokenBalance/TokenBalance';
import {Badge} from '../index';
import styles from './NetworkMenu.module.scss';

export const NetworkMenu = ({networkData, tokenData, isTarget, onRefreshClick, children}) => {
  const {toTxt, fromTxt} = useTranslation('menus.transfer');

  return (
    <div className={styles.networkMenu}>
      <Badge text={isTarget ? toTxt : fromTxt} />
      <div className={styles.networkContainer}>
        <NetworkTitle networkData={networkData} />
        <TokenBalance tokenData={tokenData} onRefreshClick={onRefreshClick} />
      </div>
      <div className={styles.transferContainer}>{children}</div>
    </div>
  );
};

NetworkMenu.propTypes = {
  networkData: PropTypes.object,
  tokenData: PropTypes.object,
  isTarget: PropTypes.bool,
  onRefreshClick: PropTypes.func,
  children: PropTypes.any
};
