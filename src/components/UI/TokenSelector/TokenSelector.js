import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as DownArrowIcon} from '../../../assets/svg/icons/collapse.svg';
import {useColors} from '../../../hooks';
import {toClasses} from '../../../utils';
import {CryptoLogoSize} from '../CryptoLogo/CryptoLogo';
import {CryptoLogo, Icon} from '../index';
import styles from './TokenSelector.module.scss';

export const TokenSelector = ({isDisabled, tokenData, onClick}) => {
  const {colorAlpha3} = useColors();

  return (
    <div
      className={toClasses(styles.tokenSelector, isDisabled && styles.isDisabled)}
      onClick={onClick}
    >
      <CryptoLogo color={colorAlpha3} size={CryptoLogoSize.SMALL} symbol={tokenData?.symbol} />
      {tokenData.symbol}
      <Icon isClickable={true}>
        <DownArrowIcon />
      </Icon>
    </div>
  );
};

TokenSelector.propTypes = {
  tokenData: PropTypes.object,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
