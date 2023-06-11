import PropTypes from 'prop-types';
import React from 'react';

import {Circle, DynamicIcon} from '@ui';

import styles from './CircleLogo.module.scss';

const CIRCLE_LOGO_SIZE_DIFF = 8;

export const CircleLogoSize = {
  XS: 22,
  SMALL: 32,
  MEDIUM: 40,
  LARGE: 50
};

export const CircleLogo = ({color, size, path, background = true}) => {
  return path ? (
    <Circle color={color} size={size}>
      <div className={styles.circleLogo}>
        <DynamicIcon path={path} size={background ? size - CIRCLE_LOGO_SIZE_DIFF : size} />
      </div>
    </Circle>
  ) : null;
};

CircleLogo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  path: PropTypes.string,
  background: PropTypes.bool
};
