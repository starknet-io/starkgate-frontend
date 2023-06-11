import PropTypes from 'prop-types';
import React from 'react';

import styles from './Image.module.scss';

export const Image = ({src, width, height, forceSizes = false}) => {
  const style = {
    maxWidth: `${width}px`,
    maxHeight: `${height}px`,
    ...(forceSizes && {width: `${width}px`, height: `${height}px`})
  };

  return <img alt="" className={styles.image} src={src} style={style} />;
};

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  forceSizes: PropTypes.bool
};
