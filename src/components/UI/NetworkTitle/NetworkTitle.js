import PropTypes from 'prop-types';
import React from 'react';

import {CryptoLogoSize} from '../CryptoLogo/CryptoLogo';
import {CryptoLogo} from '../index';
import styles from './NetworkTitle.module.scss';

export const NetworkTitle = ({networkData}) => (
  <div className={styles.networkTitle}>
    <CryptoLogo size={CryptoLogoSize.MEDIUM} symbol={networkData.symbol} />
    {networkData.name}
  </div>
);

NetworkTitle.propTypes = {
  networkData: PropTypes.object
};
