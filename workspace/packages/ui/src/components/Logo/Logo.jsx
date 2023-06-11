import PropTypes from 'prop-types';
import React from 'react';

import styles from './Logo.module.scss';

export const Logo = ({logo}) => {
  return <div className={styles.logo}>{logo}</div>;
};

Logo.propTypes = {
  logo: PropTypes.object
};
