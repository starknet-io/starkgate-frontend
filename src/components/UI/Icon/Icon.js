import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Icon.module.scss';

export const Icon = ({isClickable, onClick, style, className, children}) => (
  <div
    className={toClasses(styles.icon, className)}
    style={{
      cursor: isClickable ? 'pointer' : 'default',
      ...style
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

Icon.propTypes = {
  isClickable: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
