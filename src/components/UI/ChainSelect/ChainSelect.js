import {Select, MenuItem, FormControl} from '@mui/material';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {ReactComponent as SelectedIcon} from '../../../assets/svg/icons/selected.svg';
import {ChainInfo, ChainType} from '../../../enums';
import {useEnvs} from '../../../hooks';
import {toClasses, openInNewTab} from '../../../utils';
import styles from './ChainSelect.module.scss';

export const ChainSelect = () => {
  const {supportedL2ChainId} = useEnvs();
  const chains = Object.entries(ChainType.L2).map(([chainType, chainName]) => {
    const {CHAIN, APP_URL} = ChainInfo.L2[chainName];
    return {
      key: chainType,
      name: CHAIN,
      url: APP_URL
    };
  });
  const actualChain = chains.find(({key}) => supportedL2ChainId === ChainType.L2[key]);
  const handleChange = event => {
    const {url} = chains.find(({name}) => name === event.target.value);
    openInNewTab(url);
  };

  return (
    <div className={toClasses(styles.chainSelect)}>
      <FormControl size={'small'}>
        <Select
          IconComponent={CollapseIcon}
          renderValue={chainName => chainName}
          value={actualChain.name}
          onChange={handleChange}
        >
          {chains.map(({key, name}) => (
            <MenuItem key={key} value={name}>
              {name}
              {key === actualChain.key && (
                <div className={styles.selectedIcon}>
                  <SelectedIcon />
                </div>
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
