import PropTypes from 'prop-types';
import React from 'react';

import {Circle} from '../Circle/Circle';
import {DynamicIcon} from '../DynamicIcon/DynamicIcon';
import styles from './CircleLogo.module.scss';

const CIRCLE_LOGO_SIZE_DIFF = 14;

export const CircleLogoSize = {
  SMALL: 30,
  MEDIUM: 50,
  LARGE: 70
};

export const CircleLogo = ({color, size, path, background = true}) => {
  return path ? (
    <Circle color={color} size={size}>
      <div className={styles.circleLogo}>
        <DynamicIcon path={`${path}.svg`} size={background ? size - CIRCLE_LOGO_SIZE_DIFF : size} />
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
