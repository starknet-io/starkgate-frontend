import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './Main.module.scss';

export const Main = ({children, ...props}) => {
  return (
    <div {...props} className={toClasses(styles.main, props.className)}>
      {children}
    </div>
  );
};

Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
