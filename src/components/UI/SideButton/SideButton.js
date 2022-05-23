import PropTypes from 'prop-types';
import React from 'react';

import styles from './SideButton.module.scss';

export const SideButton = ({icon, onClick}) => {
  return (
    <div className={styles.sideButton} onClick={onClick}>
      {icon}
    </div>
  );
};

SideButton.propTypes = {
  icon: PropTypes.object,
  onClick: PropTypes.func
};
