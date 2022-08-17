import {Select, MenuItem, ListSubheader} from '@mui/material';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import sourceMap from '../../../config/sources';
import {useSource} from '../../../providers/SourceProvider';
import {useIsL1} from '../../../providers/TransferProvider';
import {CircleLogo, CircleLogoSize} from '../CircleLogo/CircleLogo';
import {SourceSelectTheme} from './SourceSelect.theme';

export const SourceSelect = () => {
  const {source, selectGroup, selectSource} = useSource();
  const [isL1] = useIsL1();

  const getSources = group => {
    return (isL1 ? group.deposit_sources : group.withdraw_sources) || group.sources;
  };

  const handleChange = event => {
    const sources = Object.values(sourceMap).reduce((sources, group) => {
      const newSources = getSources(group);
      newSources && sources.push(...newSources);
      return sources;
    }, []);
    const selected = sources.find(chain => chain.id === event.target.value);
    selected && selectSource(selected);
  };

  const renderCategorySources = (sources, group) => {
    return sources.map(({id, label, icon}) => (
      <MenuItem key={id} value={id} onClick={() => selectGroup(group)}>
        <CircleLogo {...icon} size={CircleLogoSize.SMALL} />
        {label}
      </MenuItem>
    ));
  };

  const renderSources = () => {
    return Object.entries(sourceMap).map(([key, group]) => {
      const sources = getSources(group);
      return sources
        ? [
            group.category_label ? <ListSubheader>{group.category_label}</ListSubheader> : '',
            renderCategorySources(sources, key)
          ]
        : '';
    });
  };

  return (
    <SourceSelectTheme>
      <Select
        IconComponent={CollapseIcon}
        value={source.id}
        variant={'standard'}
        onChange={handleChange}
      >
        {renderSources()}
      </Select>
    </SourceSelectTheme>
  );
};
