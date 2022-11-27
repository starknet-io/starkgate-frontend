import {Select, MenuItem, ListSubheader} from '@mui/material';
import React from 'react';

import {categories, sources, depositConfig, withdrawConfig} from '../../../config/sources';
import {useSource} from '../../../providers/SourceProvider';
import {useIsL1} from '../../../providers/TransferProvider';
import {CircleLogo, CircleLogoSize} from '../CircleLogo/CircleLogo';
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
