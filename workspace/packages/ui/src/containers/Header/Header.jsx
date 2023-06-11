import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './Header.module.scss';

export const Header = ({leftChildren, rightChildren}) => {
  return (
    <div className={toClasses(styles.header, 'row')}>
      <div className={toClasses(styles.left, 'row')}>{leftChildren}</div>
      {<div className={toClasses(styles.right, 'row')}>{rightChildren}</div>}
    </div>
  );
};

Header.propTypes = {
  leftChildren: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  rightChildren: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
