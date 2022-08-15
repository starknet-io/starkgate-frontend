import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as DownArrowIcon} from '../../../assets/svg/icons/collapse.svg';
import {useColors} from '../../../hooks';
import {CircleLogoSize} from '../CircleLogo/CircleLogo';
import {CircleLogo, Icon} from '../index';
import styles from './TokenSelector.module.scss';

export const TokenSelector = ({tokenData, onClick}) => {
  const {colorAlpha3} = useColors();

  return (
    <div className={styles.tokenSelector} onClick={onClick}>
      <CircleLogo
        color={colorAlpha3}
        path={`tokens/${tokenData?.symbol}`}
        size={CircleLogoSize.SMALL}
      />
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
