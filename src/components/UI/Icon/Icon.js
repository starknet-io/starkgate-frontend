import PropTypes from 'prop-types';
import React from 'react';

import utils from '../../../utils';
import styles from './Icon.module.scss';

export const Icon = ({isClickable, onClick, style, className, children}) => (
  <div
    className={utils.object.toClasses(styles.icon, className)}
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
