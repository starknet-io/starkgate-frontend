import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as SwapIcon} from '../../../assets/svg/icons/swap.svg';
import {useColorsWrapper} from '../../../hooks';
import {Circle, CircleLogoSize} from '../index';
import styles from './NetworkSwap.module.scss';

export const NetworkSwap = ({isFlipped, onClick}) => {
  const {colorDarkSlateBlue} = useColorsWrapper();

  return (
    <div className={toClasses(styles.networkSwap, isFlipped && styles.flipped)} onClick={onClick}>
      <Circle
        color={colorDarkSlateBlue}
        size={CircleLogoSize.SMALL}
        style={{
          boxShadow: '0px 5px 35px rgba(0, 0, 0, 0.30)'
        }}
      >
        <SwapIcon />
      </Circle>
    </div>
  );
};

NetworkSwap.propTypes = {
  isFlipped: PropTypes.bool,
  onClick: PropTypes.func
};
