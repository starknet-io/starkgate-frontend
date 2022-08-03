import {Select, MenuItem, FormControl} from '@mui/material';
import {ChainInfo, ChainType} from '@starkware-industries/commons-js-enums';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {ReactComponent as SelectedIcon} from '../../../assets/svg/icons/selected.svg';
import {useEnvs} from '../../../hooks';
import {toClasses, openInNewTab} from '../../../utils';
import styles from './ChainSelect.module.scss';
import {ChainSelectTheme} from './ChainSelect.theme';
import {APP_URL_GOERLI, APP_URL_MAINNET} from '../../../config/constants';

export const ChainSelect = () => {
  const {SUPPORTED_L2_CHAIN_ID} = useEnvs();
  const urlsMap = {
    [ChainType.L2.MAIN]: APP_URL_MAINNET,
    [ChainType.L2.GOERLI]: APP_URL_GOERLI
  };

  const handleChange = event => {
    openInNewTab(urlsMap[event.target.value]);
  };

  const renderItems = () => {
    return Object.values(ChainType.L2).map(chainName => {
      return (
        <MenuItem key={chainName} value={chainName}>
          {ChainInfo.L2[chainName].CHAIN}
          {chainName === SUPPORTED_L2_CHAIN_ID && (
            <div className={styles.selectedIcon}>
              <SelectedIcon />
            </div>
          )}
        </MenuItem>
      );
    });
  };

  return (
    <ChainSelectTheme>
      <div className={toClasses(styles.chainSelect)}>
        <FormControl size={'small'}>
          <Select
            IconComponent={CollapseIcon}
            renderValue={chainName => ChainInfo.L2[chainName].CHAIN}
            value={SUPPORTED_L2_CHAIN_ID}
            onChange={handleChange}
          >
            {renderItems()}
          </Select>
        </FormControl>
      </div>
    </ChainSelectTheme>
  );
};
