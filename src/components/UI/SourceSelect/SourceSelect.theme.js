import {createTheme, ThemeProvider} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useFonts} from '../../../hooks';

export const SourceSelectTheme = ({children}) => {
  const {colorWhite, colorAlpha, colorAlpha2, colorAlpha5, colorAlpha8} = useColors();
  const {primaryFont} = useFonts();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            padding: '4px',
            fontSize: '14px',
            color: colorWhite,
            transition: '0.3s ease-in-out',
            '&:hover': {
              backgroundColor: colorAlpha5
            }
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
            position: 'initial',
            transform: 'scale(1.4)',
            marginRight: '8px',
            '& path': {
              fill: colorWhite
            }
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
            width: '240px !important',
            padding: '8px 16px !important'
          }
        }
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            position: 'initial',
            backgroundColor: 'unset',
            lineHeight: '24px',
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
            borderRadius: '8px',
            margin: '8px 0',
            '&.Mui-selected, &:hover': {
              backgroundColor: `${colorAlpha2} !important`
            },
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
