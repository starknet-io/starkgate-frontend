import PropTypes from 'prop-types';
import React from 'react';

import styles from './MenuBackground.module.scss';

export const MenuBackground = ({children}) => {
  return <div className={styles.menuBackground}>{children}</div>;
};

MenuBackground.propTypes = {
  children: PropTypes.any
};
