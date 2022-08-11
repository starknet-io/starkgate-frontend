import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as DownArrowIcon} from '../../../assets/svg/icons/collapse.svg';
import {useColors} from '../../../hooks';
import {CryptoLogoSize} from '../CryptoLogo/CryptoLogo';
import {CryptoLogo, Icon} from '../index';
import styles from './TokenSelector.module.scss';

export const TokenSelector = ({tokenData, onClick}) => {
  const {colorAlpha3} = useColors();

  return (
    <div className={styles.tokenSelector} onClick={onClick}>
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
  onClick: PropTypes.func
};
