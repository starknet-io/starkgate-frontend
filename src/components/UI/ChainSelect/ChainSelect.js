import {Select, MenuItem, FormControl} from '@mui/material';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {ReactComponent as SelectedIcon} from '../../../assets/svg/icons/selected.svg';
import {ChainInfo, ChainType} from '../../../enums';
import {useEnvs} from '../../../hooks';
import {toClasses, openInNewTab} from '../../../utils';
import styles from './ChainSelect.module.scss';
import {ChainSelectTheme} from './ChainSelect.theme';

export const ChainSelect = () => {
  const {SUPPORTED_L2_CHAIN_ID} = useEnvs();

  const handleChange = event => {
    openInNewTab(ChainInfo.L2[event.target.value].APP_URL);
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
