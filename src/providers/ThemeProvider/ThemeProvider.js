import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import {PropTypes} from 'prop-types';
import React from 'react';

import {theme} from '../../config/theme.config';

export const ThemeProvider = props => {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.any
};
