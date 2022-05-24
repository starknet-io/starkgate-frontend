import PropTypes from 'prop-types';
import React from 'react';

import {useVars} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import styles from './SideButton.module.scss';

export const SideButton = ({icon, onClick}) => {
  const {isScrollActive} = useApp();
  const {scrollWidth} = useVars();

  return (
    <div
      className={styles.sideButton}
      style={{
        right: isScrollActive ? `${scrollWidth}px` : 0
      }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

SideButton.propTypes = {
  icon: PropTypes.object,
  onClick: PropTypes.func
};
