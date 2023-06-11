import React from 'react';

import {categories, depositConfig, sources, withdrawConfig} from '@config/sources';
import {ListSubheader, MenuItem, Select} from '@mui/material';
import {useIsL1, useSource} from '@providers';
import {CircleLogo, CircleLogoSize} from '@ui';

import {SourceSelectTheme} from './SourceSelect.theme';

export const SourceSelect = () => {
  const {source, selectSource} = useSource();
  const [isL1] = useIsL1();

  const handleChange = event => {
    selectSource(event.target.value);
  };

  const renderCategorySources = categorySources => {
    return Object.entries(categorySources).map(([sourceId]) => {
      const {label, icon} = sources[sourceId];
      return (
        <MenuItem key={sourceId} value={sourceId}>
          <CircleLogo {...icon} size={CircleLogoSize.SMALL} />
          {label}
        </MenuItem>
      );
    });
  };

  const renderSources = () => {
    const config = isL1 ? depositConfig : withdrawConfig;
    return Object.entries(config).map(([categoryId, categorySources]) => {
      const {label} = categories[categoryId];
      return [
        <ListSubheader key={label}>{label}</ListSubheader>,
        renderCategorySources(categorySources)
      ];
    });
  };

  return (
    <SourceSelectTheme>
      <Select IconComponent={''} value={source} onChange={handleChange}>
        {renderSources()}
      </Select>
    </SourceSelectTheme>
  );
};
