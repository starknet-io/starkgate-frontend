import PropTypes from 'prop-types';
import React, {useState} from 'react';

import SelectedIcon from '@assets/svg/selected.svg';
import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './Checkbox.module.scss';

export const Checkbox = ({
  checked,
  width,
  height,
  backgroundColor,
  disabled,
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(!!checked);
  const {className, style} = props;
  return (
    <div className={styles.checkboxWrapper} style={{width, height}}>
      <input
        {...props}
        checked={isChecked}
        className={toClasses(styles.checkbox, disabled && styles.disabled, className)}
        style={{backgroundColor: isChecked ? backgroundColor : '', ...style}}
        type={'checkbox'}
        onChange={event => {
          setIsChecked(prevIsCheck => !prevIsCheck);
          onChange(event);
        }}
      />
      {isChecked ? (
        <div className={styles.mark} style={{backgroundImage: `url(${SelectedIcon})`}} />
      ) : (
        ''
      )}
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
