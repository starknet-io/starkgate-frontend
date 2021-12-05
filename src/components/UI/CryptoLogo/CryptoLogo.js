import PropTypes from 'prop-types';
import React from 'react';

import {Circle} from '../Circle/Circle';
import {DynamicIcon} from '../DynamicIcon/DynamicIcon';
import {CIRCLE_LOGO_SIZE_DIFF} from './CryptoLogo.constants';
import styles from './CryptoLogo.module.scss';

export const CryptoLogo = ({symbol, color, size}) =>
  symbol ? (
    <Circle color={color} size={size}>
      <div className={styles.cryptoLogo}>
        <DynamicIcon
          path={`tokens/${symbol.toLowerCase()}.svg`}
          size={size - CIRCLE_LOGO_SIZE_DIFF}
        />
      </div>
    </Circle>
  ) : null;

CryptoLogo.propTypes = {
  symbol: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
};
