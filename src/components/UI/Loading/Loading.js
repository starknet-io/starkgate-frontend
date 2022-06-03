import {CircularProgress} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export const LoadingSize = {
  XS: 13,
  SMALL: 25,
  MEDIUM: 50,
  LARGE: 70,
  XL: 110
};

export const Loading = ({size}) => {
  return <CircularProgress size={size} />;
};

Loading.propTypes = {
  size: PropTypes.number
};
