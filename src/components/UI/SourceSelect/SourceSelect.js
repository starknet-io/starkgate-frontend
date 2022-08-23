import {Select, MenuItem, ListSubheader} from '@mui/material';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {categories, sources, depositConfig, withdrawConfig} from '../../../config/sources';
import {useSource} from '../../../providers/SourceProvider';
import {useIsL1} from '../../../providers/TransferProvider';
import {CircleLogo, CircleLogoSize} from '../CircleLogo/CircleLogo';
import styles from './SourceSelect.module.scss';
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
        renderCategorySources(categorySources),
        <div key={categoryId} className={styles.separateLine} />
      ];
    });
  };

  return (
    <SourceSelectTheme>
      <Select IconComponent={CollapseIcon} value={source} onChange={handleChange}>
        {renderSources()}
      </Select>
    </SourceSelectTheme>
  );
};
