import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils';
import {CryptoLogoSize} from '../CryptoLogo/CryptoLogo';
import {CryptoLogo} from '../index';
import styles from './NetworkTitle.module.scss';

export const NetworkTitle = ({networkData, isDisabled}) => (
  <div className={toClasses(styles.networkTitle, isDisabled && styles.isDisabled)}>
    <CryptoLogo size={CryptoLogoSize.MEDIUM} symbol={networkData.symbol} />
    {networkData.name}
  </div>
);

NetworkTitle.propTypes = {
  networkData: PropTypes.object,
  isDisabled: PropTypes.bool
};
