import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '@hooks';
import {ThemeProvider, createTheme} from '@mui/material';
import {hexToRgba} from '@starkware-webapps/utils-browser';

export const TextFieldTheme = ({error, children}) => {
  const {colorGainsboro, colorOrangeSoda, colorIndigo, colorUbe, colorWhite} = useColors();

  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              color: colorWhite
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%'
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: colorGainsboro,
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '20px',
            '&.Mui-focused': {
              color: colorGainsboro
            }
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            background: colorIndigo,
            marginTop: '18px'
          },
          input: {
            color: colorWhite,
            padding: '10px 12px',
            borderRadius: '8px',
            fontSize: 18,
            fontWeight: 500,
            height: '28px',
            lineHeight: '28px',
            '&.Mui-disabled': {
              color: hexToRgba(colorWhite, '0.3'),
              '-webkit-text-fill-color': 'inherit'
            }
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: () => (error ? colorOrangeSoda : colorUbe)
          }
        }
      }
    }
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

TextFieldTheme.propTypes = {
  error: PropTypes.bool,
  children: PropTypes.object
};
