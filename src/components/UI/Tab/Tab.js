import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Tab.module.scss';

export const Tab = ({text, isActive, onClick}) => {
  return (
    <div className={toClasses(styles.tab, isActive && styles.isActive)} onClick={onClick}>
      {text}
    </div>
  );
};

Tab.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
