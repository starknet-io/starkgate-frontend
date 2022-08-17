import {createTheme, ThemeProvider} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useFonts} from '../../../hooks';

export const SourceSelectTheme = ({children}) => {
  const {colorWhite, colorAlpha4, colorAlpha5} = useColors();
  const {primaryFont} = useFonts();
  const theme = createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            color: colorWhite,
            backgroundColor: colorAlpha4
          },
          input: {
            fontFamily: primaryFont,
            display: 'flex'
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            transform: 'scale(1.5)',
            margin: '6px',
            '& path': {
              fill: colorWhite
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            marginTop: '4px',
            border: `1px solid ${colorWhite}`,
            borderRadius: '8px',
            backgroundColor: colorAlpha5,
            color: colorWhite
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: '0'
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: primaryFont,
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 255, 255, 0.1) !important'
            }
          }
        }
      }
    }
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

SourceSelectTheme.propTypes = {
  children: PropTypes.object
};
