import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils';
import {CircleLogoSize} from '../CircleLogo/CircleLogo';
import {CircleLogo} from '../index';
import styles from './NetworkTitle.module.scss';

export const NetworkTitle = ({networkName, isDisabled}) => (
  <div className={toClasses(styles.networkTitle, isDisabled && styles.isDisabled)}>
    <CircleLogo path={`chains/${networkName.toLowerCase()}`} size={CircleLogoSize.MEDIUM} />
    {networkName}
  </div>
);

NetworkTitle.propTypes = {
  networkName: PropTypes.string,
  isDisabled: PropTypes.bool
};
