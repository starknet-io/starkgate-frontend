import PropTypes from 'prop-types';
import React from 'react';

import {CircleLogoSize} from '../CircleLogo/CircleLogo';
import {CircleLogo} from '../index';
import styles from './NetworkTitle.module.scss';

export const NetworkTitle = ({networkName}) => (
  <div className={styles.networkTitle}>
    <CircleLogo path={`chains/${networkName.toLowerCase()}`} size={CircleLogoSize.SMALL} />
    {networkName}
  </div>
);

NetworkTitle.propTypes = {
  networkName: PropTypes.string
};
