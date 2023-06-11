import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './FastWithdrawal.module.scss';
import {FastWithdrawalCheckbox} from './FastWithdrawalCheckbox';
import {FastWithdrawalDisclaimer} from './FastWithdrawalDisclaimer/FastWithdrawalDisclaimer';

export const FastWithdrawal = ({checked, disabled}) => {
  return (
    <div className={toClasses(styles.fastWithdrawal, disabled && styles.disabled)}>
      <FastWithdrawalCheckbox checked={checked} />
      {checked && <FastWithdrawalDisclaimer />}
    </div>
  );
};

FastWithdrawal.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool
};
