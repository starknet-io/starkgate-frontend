import PropTypes from 'prop-types';
import React from 'react';

import {CircularProgress, LinearProgress} from '@mui/material';

export const LoadingType = {
  CIRCULAR: 0,
  LINEAR: 1
};

export const LoadingSize = {
  XS: 13,
  SMALL: 25,
  MEDIUM: 50,
  LARGE: 70,
  XL: 110
};

export const Loading = ({size, type = LoadingType.CIRCULAR}) => {
  return type === LoadingType.LINEAR ? <LinearProgress /> : <CircularProgress size={size} />;
};

Loading.propTypes = {
  size: PropTypes.number,
  type: PropTypes.number
};
