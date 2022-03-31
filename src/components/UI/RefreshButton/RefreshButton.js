import PropTypes from 'prop-types';
import React from 'react';

import styles from './RefreshButton.module.scss';

export const RefreshButton = ({onClick}) => (
  <div className={styles.refreshButton} onClick={onClick}>
    refresh
  </div>
);

RefreshButton.propTypes = {
  onClick: PropTypes.func
};
