import {NetworkType} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React from 'react';

import Tokens from '../../../config/tokens';
import {toClasses} from '../../../utils';
import {CircleLogoSize} from '../CircleLogo/CircleLogo';
import {CircleLogo} from '../index';
import styles from './NetworkTitle.module.scss';

export const NetworkTitle = ({networkName, isDisabled}) => (
  <div className={toClasses(styles.networkTitle, isDisabled && styles.isDisabled)}>
    <CircleLogo
      path={
        networkName === NetworkType.L1
          ? `tokens/${Tokens.L1.ETH.symbol}.svg`
          : `chains/${networkName.toLowerCase()}.svg`
      }
      size={CircleLogoSize.MEDIUM}
    />
    {networkName}
  </div>
);

NetworkTitle.propTypes = {
  networkName: PropTypes.string,
  isDisabled: PropTypes.bool
};
