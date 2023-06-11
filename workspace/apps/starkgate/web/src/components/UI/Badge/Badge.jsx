import PropTypes from 'prop-types';
import React from 'react';

import styles from './Badge.module.scss';

export const Badge = ({text}) => <div className={styles.badge}>{text}</div>;

Badge.propTypes = {
  text: PropTypes.string
};
