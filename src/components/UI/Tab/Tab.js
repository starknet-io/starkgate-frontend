import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Tab.module.scss';

export const Tab = ({text, isActive, icon, onClick}) => {
  return (
    <div className={toClasses(styles.tab, isActive && styles.isActive)} onClick={onClick}>
      {text} {icon}
    </div>
  );
};

Tab.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  icon: PropTypes.object,
  onClick: PropTypes.func
};
