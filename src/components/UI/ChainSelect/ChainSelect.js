import {Select, MenuItem, FormControl, createTheme, ThemeProvider} from '@mui/material';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {ReactComponent as SelectedIcon} from '../../../assets/svg/icons/selected.svg';
import {ChainInfo, ChainType} from '../../../enums';
import {useColors, useEnvs, useFonts} from '../../../hooks';
import {toClasses, openInNewTab} from '../../../utils';
import styles from './ChainSelect.module.scss';

export const ChainSelect = () => {
  const {supportedL2ChainId} = useEnvs();

  const handleChange = event => {
    openInNewTab(ChainInfo.L2[event.target.value].APP_URL);
  };

  const renderItems = () => {
    return Object.values(ChainType.L2).map(chainName => {
      return (
        <MenuItem key={chainName} value={chainName}>
          {ChainInfo.L2[chainName].CHAIN}
          {chainName === supportedL2ChainId && (
            <div className={styles.selectedIcon}>
              <SelectedIcon />
            </div>
          )}
        </MenuItem>
      );
    });
  };

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

  return (
    <ThemeProvider theme={theme}>
      <div className={toClasses(styles.chainSelect)}>
        <FormControl size={'small'}>
          <Select
            IconComponent={CollapseIcon}
            renderValue={chainName => ChainInfo.L2[chainName].CHAIN}
            value={supportedL2ChainId}
            onChange={handleChange}
          >
            {renderItems()}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};
