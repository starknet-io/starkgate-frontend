import {createTheme, ThemeProvider} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import CollapseIcon from '../../../assets/svg/icons/collapse.svg';
import SelectedIcon from '../../../assets/svg/icons/selected.svg';
import {useColors, useFonts} from '../../../hooks';

export const SourceSelectTheme = ({children}) => {
  const {
    colorWhite,
    colorWhiteOp10,
    colorSpaceCadet,
    colorSpaceCadet2,
    colorDarkSlateBlue,
    colorLightSteelBlue
  } = useColors();
  const {primaryFont} = useFonts();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            padding: '4px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: primaryFont,
            color: colorWhite,
            transition: '0.3s ease-in-out',
            '&:hover': {
              backgroundColor: colorDarkSlateBlue
            }
          },
          input: {
            padding: 0,
            paddingRight: '8px !important',
            display: 'flex',
            alignItems: 'center',
            '&:after': {
              content: `url(${CollapseIcon})`,
              paddingLeft: '8px',
              lineHeight: '0'
            }
          },
          notchedOutline: {
            border: 0
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colorSpaceCadet,
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
            padding: 0,
            backgroundColor: 'unset',
            lineHeight: '24px',
            color: colorLightSteelBlue,
            fontFamily: primaryFont,
            letterSpacing: '0.01em',
            '&:not(:first-of-type):before': {
              content: '""',
              display: 'block',
              height: '1px',
              marginBottom: '8px',
              backgroundColor: colorWhiteOp10
            }
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
            backgroundColor: `${colorSpaceCadet} !important`,
            '&:hover': {
              backgroundColor: `${colorSpaceCadet2} !important`
            },
            '&.Mui-selected:after': {
              content: `url(${SelectedIcon})`,
              position: 'absolute',
              right: '16px'
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
