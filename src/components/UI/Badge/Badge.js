import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Badge.module.scss';

export const Badge = ({text, isDisabled}) => (
  <div className={toClasses(styles.badge, isDisabled && styles.isDisabled)}>{text}</div>
);

Badge.propTypes = {
  text: PropTypes.string,
  isDisabled: PropTypes.bool
};
