import PropTypes from 'prop-types';
import React from 'react';

import {Tooltip as MuiTooltip} from '@mui/material';

import {TooltipTheme} from './Tooltip.theme';

export const Tooltip = ({title, color, children}) => {
  return (
    <TooltipTheme color={color}>
      <MuiTooltip title={title}>{children}</MuiTooltip>
    </TooltipTheme>
  );
};

Tooltip.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
