import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as DownArrowIcon} from '../../../../assets/svg/icons/collapse.svg';
import {useColors, useIsLoading} from '../../../../hooks';
import {CryptoLogo, Icon, Loading} from '../../../UI';
import {CryptoLogoSize} from '../../../UI/CryptoLogo/CryptoLogo.enums';
import {LoadingSize} from '../../../UI/Loading/Loading.enums';
import styles from './TokenSelector.module.scss';

export const TokenSelector = ({tokenData, onClick}) => {
  const {colorAlpha5} = useColors();
  const isLoading = useIsLoading(tokenData.symbol);

  return (
    <div className={styles.tokenSelector} onClick={onClick}>
      {isLoading && <Loading size={LoadingSize.SMALL} />}
      {!isLoading && (
        <>
          <CryptoLogo color={colorAlpha5} size={CryptoLogoSize.SMALL} symbol={tokenData?.symbol} />
          {tokenData.symbol}
        </>
      )}
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
