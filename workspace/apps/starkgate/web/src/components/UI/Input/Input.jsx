import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './Input.module.scss';

export const Input = forwardRef(({isDisabled, placeholderColor, style, ...props}, ref) => (
  <input
    ref={ref}
    className={toClasses(styles.input, isDisabled && styles.isDisabled)}
    {...props}
    style={{
      '--placeholder-color': placeholderColor,
      ...style
    }}
  />
));

Input.propTypes = {
  isDisabled: PropTypes.bool,
  placeholderColor: PropTypes.string,
  style: PropTypes.object
};

Input.displayName = 'Input';
