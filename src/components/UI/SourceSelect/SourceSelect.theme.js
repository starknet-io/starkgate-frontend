import {createTheme, ThemeProvider} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useFonts} from '../../../hooks';

export const SourceSelectTheme = ({children}) => {
  const {colorWhite, colorAlpha, colorAlpha3, colorAlpha8} = useColors();
  const {primaryFont} = useFonts();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            color: colorWhite
          },
          notchedOutline: {
            border: 0
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            padding: 0,
            paddingRight: '8px !important',
            fontFamily: primaryFont,
            display: 'flex',
            alignItems: 'center',
            fontWeight: '600'
          },

          icon: {
            position: 'initial'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colorAlpha,
            color: colorWhite,
            borderRadius: '8px'
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            width: '240px',
            padding: '8px'
          }
        }
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            backgroundColor: 'unset',
            lineHeight: '150%',
            color: colorAlpha8,
            fontFamily: primaryFont,
            letterSpacing: '0.01em'
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: primaryFont,
            fontSize: '14px',
            padding: '4px',
            border: `1px solid ${colorAlpha3}`,
            borderRadius: '8px',
            margin: '8px',
            backgroundColor: 'unset !important',
            '& .MuiTouchRipple-root': {
              display: 'none'
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
