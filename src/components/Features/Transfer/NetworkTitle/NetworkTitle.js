import PropTypes from 'prop-types';
import React from 'react';

import {CryptoLogo} from '../../../UI';
import {CryptoLogoSize} from '../../../UI/CryptoLogo/CryptoLogo.enums';
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
