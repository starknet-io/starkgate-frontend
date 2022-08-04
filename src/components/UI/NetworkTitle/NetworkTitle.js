import {NetworkType} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React from 'react';

import Tokens from '../../../config/tokens';
import {toClasses} from '../../../utils';
import {CryptoLogoSize} from '../CryptoLogo/CryptoLogo';
import {CryptoLogo} from '../index';
import styles from './NetworkTitle.module.scss';

export const NetworkTitle = ({networkName, isDisabled}) => (
  <div className={toClasses(styles.networkTitle, isDisabled && styles.isDisabled)}>
    <CryptoLogo
      size={CryptoLogoSize.MEDIUM}
      symbol={networkName === NetworkType.L1 ? Tokens.L1.ETH.symbol : networkName}
    />
    {networkName}
  </div>
);

NetworkTitle.propTypes = {
  networkName: PropTypes.string,
  isDisabled: PropTypes.bool
};
