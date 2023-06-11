import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '@hooks';
import {ThemeProvider, alpha, createTheme} from '@mui/material';

export const LoadingTheme = ({children}) => {
  const {colorOrangeSoda} = useColors();

  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(colorOrangeSoda, 0.3),
            height: '8px',
            borderRadius: '54px'
          },
          bar: {
            backgroundColor: colorOrangeSoda
          }
        }
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: colorOrangeSoda
          }
        }
      }
    }
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

LoadingTheme.propTypes = {
  children: PropTypes.object
};
