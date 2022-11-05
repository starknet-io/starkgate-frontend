import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {MaxButton} from '../MaxButton/MaxButton';
import {TokenSelector} from '../TokenSelector/TokenSelector';
import {Input} from '../index';
import styles from './TokenInput.module.scss';

export const TokenInput = ({
  value,
  hasError,
  tokenData,
  isInputDisabled,
  onMaxClick,
  onTokenSelect,
  onInputChange
}) => {
  const {inputPlaceholderTxt} = useTransferTranslation();

  return (
    <div className={toClasses(styles.tokenInput, hasError && styles.hasError)}>
      <Input
        isDisabled={isInputDisabled}
        placeholder={inputPlaceholderTxt}
        style={{
          fontSize: '24px',
          fontWeight: '600'
        }}
        type="number"
        value={value}
        onChange={onInputChange}
      />
      <MaxButton onClick={onMaxClick} />
      <TokenSelector tokenData={tokenData} onClick={onTokenSelect} />
    </div>
  );
};

TokenInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hasError: PropTypes.bool,
  isInputDisabled: PropTypes.bool,
  tokenData: PropTypes.object,
  onMaxClick: PropTypes.func,
  onTokenSelect: PropTypes.func,
  onInputChange: PropTypes.func
};
