import React from 'react';

import {APP_URL_GOERLI, APP_URL_MAINNET} from '@config/constants';
import {useEnvs} from '@hooks';
import {MenuItem, Select} from '@mui/material';
import {ChainInfo, ChainType} from '@starkware-webapps/enums';
import {openInNewTab} from '@starkware-webapps/utils-browser';

import {ChainSelectTheme} from './ChainSelect.theme';

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
      if (ChainInfo.L2[chainName].DISABLED) return null;
      return (
        <MenuItem key={chainName} value={chainName}>
          {ChainInfo.L2[chainName].CHAIN}
        </MenuItem>
      );
    });
  };

  return (
    <ChainSelectTheme>
      <Select
        IconComponent={''}
        renderValue={chainName => ChainInfo.L2[chainName].CHAIN}
        value={SUPPORTED_L2_CHAIN_ID}
        onChange={handleChange}
      >
        {renderItems()}
      </Select>
    </ChainSelectTheme>
  );
};
