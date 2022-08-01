import {createTheme, ThemeProvider} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useFonts} from '../../../hooks';

export const ChainSelectTheme = ({children}) => {
  const {colorWhite, colorAlpha5} = useColors();
  const {primaryFont} = useFonts();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: '#fff',
            borderRadius: '8px',
            minWidth: '108px',
            '&, &:hover, &.Mui-focused': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: colorWhite,
                borderWidth: '1px'
              }
            }
          },
          input: {
            fontFamily: primaryFont
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

ChainSelectTheme.propTypes = {
  children: PropTypes.object
};
