import PropTypes from 'prop-types';
import React from 'react';

import {Circle} from '../Circle/Circle';
import {DynamicIcon} from '../DynamicIcon/DynamicIcon';
import styles from './CryptoLogo.module.scss';

const CIRCLE_LOGO_SIZE_DIFF = 14;

export const CryptoLogoSize = {
  SMALL: 30,
  MEDIUM: 50,
  LARGE: 70
};

export const CryptoLogo = ({symbol, color, size}) => {
  return symbol ? (
    <Circle color={color} size={size}>
      <div className={styles.cryptoLogo}>
        <DynamicIcon
          path={`tokens/${symbol.toLowerCase()}.svg`}
          size={size - CIRCLE_LOGO_SIZE_DIFF}
        />
      </div>
    </Circle>
  ) : null;
};

CryptoLogo.propTypes = {
  symbol: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
};
