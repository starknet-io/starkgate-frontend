import PropTypes from 'prop-types';
import React from 'react';

import lightAccentBackgroundPath from '@assets/img/light-accent.png';
import starsBackgroundPath from '@assets/img/stars.png';

import styles from './StyledBackground.module.scss';

export const StyledBackground = ({withStars = true, withLightAccent = true, children}) => {
  const stars = `url(${starsBackgroundPath})`;
  const lightAccent = `url(${lightAccentBackgroundPath})`;

  let backgroundImage = '';

  if (withStars) {
    backgroundImage += stars;
  }
  if (withLightAccent) {
    if (withStars) {
      backgroundImage += ',';
    }
    backgroundImage += lightAccent;
  }

  return (
    <div
      className={styles.styledBackground}
      style={{
        backgroundImage
      }}
    >
      {children}
    </div>
  );
};

StyledBackground.propTypes = {
  withStars: PropTypes.bool,
  withLightAccent: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
