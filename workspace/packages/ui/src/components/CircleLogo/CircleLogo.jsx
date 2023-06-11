import PropTypes from 'prop-types';
import React from 'react';

import {Circle} from '../Circle/Circle';
import {DynamicIcon} from '../DynamicIcon/DynamicIcon';
import styles from './CircleLogo.module.scss';

const CIRCLE_LOGO_SIZE_DIFF = 8;

export const CircleLogoSize = {
  XS: 22,
  SMALL: 32,
  MEDIUM: 40,
  LARGE: 50
};

export const CircleLogo = ({path, color, size, background = true}) => {
  return (
    <Circle color={color} size={size}>
      <div className={styles.circleLogo}>
        <DynamicIcon path={path} size={background ? size - CIRCLE_LOGO_SIZE_DIFF : size} />
      </div>
    </Circle>
  );
};

CircleLogo.propTypes = {
  path: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  background: PropTypes.bool
};
