import PropTypes from 'prop-types';
import React from 'react';

import styles from './Circle.module.scss';

export const Circle = ({size, color, style, children}) => {
  return (
    <div
      className={styles.circle}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        background: color,
        ...style
      }}
    >
      {children}
    </div>
  );
};

Circle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.object
};
