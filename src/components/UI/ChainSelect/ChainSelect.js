import {Select, MenuItem, FormControl} from '@mui/material';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {ReactComponent as SelectedIcon} from '../../../assets/svg/icons/selected.svg';
import {appUrlTest, appUrlProd} from '../../../config/envs';
import {ChainInfo, ChainType} from '../../../enums';
import {useEnvs} from '../../../hooks';
import {toClasses, openInNewTab} from '../../../utils';
import styles from './ChainSelect.module.scss';

export const ChainSelect = () => {
  const {supportedL2ChainId} = useEnvs();
  const chains = [
    {
      key: Object.keys(ChainType.L2)[0],
      name: ChainInfo.L2[ChainType.L2.MAIN].CHAIN,
      url: appUrlProd
    },
    {
      key: Object.keys(ChainType.L2)[1],
      name: ChainInfo.L2[ChainType.L2.GOERLI].CHAIN,
      url: appUrlTest
    }
  ];
  const actualChain = chains.find(chain => supportedL2ChainId === ChainType.L2[chain.key]);
  return (
    <div className={toClasses(styles.chainSelect)}>
      <FormControl size={'small'}>
        <Select
          IconComponent={CollapseIcon}
          renderValue={chainName => chainName}
          value={actualChain.name}
          onChange={event => {
            const {url} = chains.find(({name}) => name === event.target.value);
            openInNewTab(url);
          }}
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
