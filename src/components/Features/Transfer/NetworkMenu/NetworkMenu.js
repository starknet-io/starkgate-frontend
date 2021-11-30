import PropTypes from 'prop-types';
import React from 'react';

import {Badge} from '../../../UI';
import {NetworkTitle} from '../NetworkTitle/NetworkTitle';
import {TokenBalance} from '../TokenBalance/TokenBalance';
import styles from './NetworkMenu.module.scss';

export const NetworkMenu = ({title, networkData, tokenData, children}) => {
  return (
    <div className={styles.networkMenu}>
      <Badge text={title} />
      <div className={styles.networkContainer}>
        <NetworkTitle networkData={networkData} />
        <TokenBalance balance={tokenData.balance} symbol={tokenData.symbol} />
      </div>
      {children}
    </div>
  );
};

NetworkMenu.propTypes = {
  title: PropTypes.string,
  networkData: PropTypes.object,
  tokenData: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
