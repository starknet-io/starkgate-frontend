import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';

import {toClasses} from '../../../utils';
import styles from './Input.Module.scss';

export const Input = forwardRef(({isDisabled, ...props}, ref) => (
  <input
    ref={ref}
    className={toClasses(styles.input, isDisabled && styles.isDisabled)}
    {...props}
  />
));

Input.propTypes = {
  isDisabled: PropTypes.bool
};

Input.displayName = 'Input';
