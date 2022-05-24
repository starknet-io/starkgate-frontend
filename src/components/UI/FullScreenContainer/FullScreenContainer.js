import PropTypes from 'prop-types';
import React from 'react';

import styles from './FullScreenContainer.module.scss';

export const FullScreenContainer = ({children}) => {
  return <div className={styles.fullScreenContainer}>{children}</div>;
};

FullScreenContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
