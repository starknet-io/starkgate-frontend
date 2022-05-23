import PropTypes from 'prop-types';
import React from 'react';

import styles from './BurgerMenuItem.module.scss';

export const BurgerMenuItem = ({label, onClick}) => {
  return (
    <div className={styles.burgerMenuItem} onClick={onClick}>
      {label}
    </div>
  );
};

BurgerMenuItem.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};
