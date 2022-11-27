import {createTheme, ThemeProvider} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import CollapseIcon from '../../../assets/svg/icons/collapse.svg';
import SelectedIcon from '../../../assets/svg/icons/selected.svg';
import {useColors, useFonts} from '../../../hooks';

export const ChainSelectTheme = ({children}) => {
  const {colorWhite, colorSpaceCadet, colorSpaceCadet2} = useColors();
  const {primaryFont} = useFonts();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: '127px',
            margin: '0 16px',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '20px',
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
            padding: '8px 16px !important',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:after': {
              content: `url(${CollapseIcon})`,
              paddingLeft: '12px',
              transform: 'scale(1.3)',
              lineHeight: '0'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '8px',
            backgroundColor: colorSpaceCadet,
            color: colorWhite,
            marginTop: '4px'
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
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '20px',
            padding: '4px 8px',
            borderRadius: '8px',
            margin: '8px',
            backgroundColor: `${colorSpaceCadet} !important`,
            '&:hover': {
              backgroundColor: `${colorSpaceCadet2} !important`
            },
            '&.Mui-selected:after': {
              content: `url(${SelectedIcon})`,
              position: 'absolute',
              right: '12px'
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

ChainSelectTheme.propTypes = {
  children: PropTypes.object
};
