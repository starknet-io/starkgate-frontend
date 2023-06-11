import PropTypes from 'prop-types';
import React from 'react';

import {useConstants, useTransferTranslation} from '@hooks';
import {useTransfer} from '@providers';
import {CheckboxWithText} from '@ui';

import styles from './AutoWithdrawal.module.scss';

export const AutoWithdrawal = ({checked, disabled}) => {
  const {setAutoWithdrawal} = useTransfer();
  const {enableAutoWithdrawal, readMoreTxt} = useTransferTranslation();
  const {AUTO_WITHDRAWAL_READ_MORE_URL} = useConstants();

  return (
    <div className={styles.autoWithdrawal}>
      <CheckboxWithText
        checked={checked}
        disabled={disabled}
        linkTxt={readMoreTxt}
        linkUrl={AUTO_WITHDRAWAL_READ_MORE_URL}
        message={enableAutoWithdrawal}
        onChange={event => setAutoWithdrawal(event.currentTarget.checked)}
      />
    </div>
  );
};

AutoWithdrawal.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool
};
