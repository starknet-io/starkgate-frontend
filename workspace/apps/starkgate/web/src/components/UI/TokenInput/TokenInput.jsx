import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '@hooks';
import {toClasses} from '@starkware-webapps/utils-browser';
// import {MaxButton} from '../MaxButton/MaxButton';
import {Input, TokenSelector} from '@ui';

import styles from './TokenInput.module.scss';

export const TokenInput = ({
  value,
  hasError,
  tokenData,
  isInputDisabled,
  onTokenSelect,
  onInputChange
}) => {
  const {inputPlaceholderTxt} = useTransferTranslation();

  return (
    <div
      className={toClasses(
        styles.tokenInput,
        hasError && styles.hasError,
        isInputDisabled && styles.disable
      )}
    >
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
      {/* <MaxButton onClick={onMaxClick} /> */}
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
