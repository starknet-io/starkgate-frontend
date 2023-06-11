import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as CollapseExpandIcon} from '@assets/svg/icons/collapse.svg';
import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './CollapseExpand.module.scss';

export const CollapseExpand = ({isCollapsed, size, onClick}) => {
  return (
    <CollapseExpandIcon
      className={toClasses(styles.collapseExpand, isCollapsed && styles.isCollapsed)}
      style={{
        height: `${size}px`,
        width: `${size}px`
      }}
      onClick={onClick}
    />
  );
};

CollapseExpand.propTypes = {
  isCollapsed: PropTypes.bool,
  size: PropTypes.number,
  onClick: PropTypes.func
};
