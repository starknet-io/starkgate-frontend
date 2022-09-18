import {createTheme, ThemeProvider} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import {useColorsWrapper, useFontsWrapper} from '../../../hooks';

export const ChainSelectTheme = ({children}) => {
  const {colorWhite, colorDarkSlateBlue, colorToolbox} = useColorsWrapper();
  const {primaryFont} = useFontsWrapper();

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            margin: '0 16px',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '20px',
            padding: '8px 16px',
            fontFamily: primaryFont,
            color: colorWhite,
            borderRadius: '8px',
            '&, &:hover, &.Mui-focused': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: colorWhite,
                borderWidth: '1px'
              }
            }
          },
          input: {
            padding: '0',
            paddingRight: '16px !important'
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            position: 'initial',
            width: '16px'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transform: 'translate(5px, 12px) !important',
            border: `1px solid ${colorWhite}`,
            borderRadius: '8px',
            backgroundColor: colorDarkSlateBlue,
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
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '20px',
            padding: '8px 12px 8px 16px',
            fontFamily: primaryFont,
            backgroundColor: colorDarkSlateBlue,
            '&.Mui-selected': {
              backgroundColor: `${colorToolbox} !important`
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
