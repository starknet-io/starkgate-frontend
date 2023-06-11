import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '@hooks';
import {ThemeProvider, createTheme} from '@mui/material';

export const StepperTheme = ({children}) => {
  const {colorGainsboro1, colorSpaceCadet, colorLightSteelBlue} = useColors();

  const theme = createTheme({
    components: {
      MuiStep: {
        styleOverrides: {
          root: {
            '.MuiSvgIcon-root': {
              color: colorLightSteelBlue,
              fontSize: '32px',
              '&.Mui-completed, &.Mui-active': {
                color: colorSpaceCadet
              }
            }
          }
        }
      },
      MuiStepConnector: {
        styleOverrides: {
          root: {
            top: '15px'
          },
          line: {
            borderColor: colorGainsboro1,
            width: '80%',
            margin: 'auto'
          }
        }
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            '&.MuiStepLabel-alternativeLabel': {
              marginTop: '8px',
              fontWeight: '900'
            }
          }
        }
      }
    }
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

StepperTheme.propTypes = {
  children: PropTypes.object
};
