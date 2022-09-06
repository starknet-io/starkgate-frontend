import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './BurgerMenuItem.module.scss';

export const BurgerMenuItem = ({label, isActive, onClick}) => {
  return (
    <div
      className={toClasses(styles.burgerMenuItem, isActive && styles.isActive)}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

BurgerMenuItem.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
