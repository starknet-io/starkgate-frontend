import PropTypes from 'prop-types';
import React from 'react';

export const Icon = ({path, size}) => {
  return <img alt="" src={path} style={{width: `${size}px`, height: `${size}px`}} />;
};

Icon.propTypes = {
  path: PropTypes.string,
  size: PropTypes.number
};
