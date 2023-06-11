import PropTypes from 'prop-types';
import React from 'react';

import {useFonts} from '@hooks';
import {ThemeProvider, createTheme} from '@mui/material';

export const TooltipTheme = ({color, children}) => {
  const {primaryFont} = useFonts();

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'transparent',
            fontSize: '10px',
            fontFamily: primaryFont,
            color
          },
          tooltipPlacementBottom: {
            marginTop: '-2px !important'
          }
        }
      }
    }
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

TooltipTheme.propTypes = {
  color: PropTypes.string,
  children: PropTypes.object
};
