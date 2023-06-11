import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as DownArrowIcon} from '@assets/svg/icons/collapse.svg';
import {useColors} from '@hooks';
import {CircleLogo, CircleLogoSize, Icon} from '@ui';

import styles from './TokenSelector.module.scss';

export const TokenSelector = ({tokenData, onClick}) => {
  const {colorIndigo} = useColors();

  return (
    <div className={styles.tokenSelector} onClick={onClick}>
      {tokenData && (
        <>
          <CircleLogo
            color={colorIndigo}
            path={`tokens/${tokenData.symbol}`}
            size={CircleLogoSize.XS}
          />
          {tokenData.symbol}
        </>
      )}
      <Icon className={styles.tokenSelectorIcon} isClickable={true}>
        <DownArrowIcon />
      </Icon>
    </div>
  );
};

TokenSelector.propTypes = {
  tokenData: PropTypes.object,
  onClick: PropTypes.func
};
