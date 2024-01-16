import PropTypes from 'prop-types';
import React from 'react';

import CollapseIcon from '@assets/svg/icons/collapse.svg';
import SelectedIcon from '@assets/svg/icons/selected.svg';
import {useColors} from '@hooks';
import {ThemeProvider, createTheme} from '@mui/material';

export const BlockExplorerSelectTheme = ({children}) => {
  const {colorSpaceCadet, colorDodgerBlue, colorSpaceCadet2} = useColors();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            lineHeight: 1,
            height: '12px',
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          },
          input: {
            padding: '4px !important',
            '&:after': {
              display: 'inline-block',
              content: '""',
              webkitMask: `url(${CollapseIcon})`,
              mask: `url(${CollapseIcon})`,
              webkitMaskSize: 'cover',
              maskSize: 'cover',
              backgroundColor: colorDodgerBlue,
              width: '8px',
              height: '4px'
            }
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            display: 'none'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            border: `1px solid ${colorDodgerBlue}`,
            borderRadius: '8px',
            marginTop: '6px',
            width: '103px',
            transform: 'translateX(-44px) !important'
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 4px',
            backgroundColor: colorSpaceCadet
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            '&:hover': {
              backgroundColor: `${colorSpaceCadet2} !important`
            },
            '&.Mui-selected': {
              backgroundColor: colorSpaceCadet,
              '&:after': {
                display: 'inline-block',
                content: '""',
                webkitMask: `url(${SelectedIcon})`,
                mask: `url(${SelectedIcon})`,
                webkitMaskSize: 'cover',
                maskSize: 'cover',
                backgroundColor: colorDodgerBlue,
                width: '12px',
                height: '10px',
                marginBottom: '2px'
              }
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

export const BlockExplorerLargeSelectTheme = ({children}) => {
  const {colorSpaceCadet, colorIndigo} = useColors();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          },
          input: {
            padding: '12px !important',
            '&:after': {
              display: 'inline-block',
              content: '""',
              webkitMask: `url(${CollapseIcon})`,
              mask: `url(${CollapseIcon})`,
              webkitMaskSize: 'cover',
              maskSize: 'cover',
              backgroundColor: colorIndigo,
              width: '18px',
              height: '9px'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            marginTop: '4px',
            transform: 'translateX(-94px) !important'
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: '16px 3px',
            backgroundColor: colorSpaceCadet
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '0',
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: `${colorSpaceCadet} !important`,
              '&:after': {
                content: `url(${SelectedIcon})`,
                position: 'absolute',
                right: '12px'
              }
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

BlockExplorerSelectTheme.propTypes = {
  children: PropTypes.object
};

BlockExplorerLargeSelectTheme.propTypes = {
  children: PropTypes.object
};
