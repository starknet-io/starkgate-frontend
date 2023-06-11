import PropTypes from 'prop-types';
import React from 'react';

import {ReactComponent as CollapseExpandIcon} from '@assets/svg/collapse.svg';
import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './CollapseExpand.module.scss';

export const CollapseExpand = ({isCollapsed, ...props}) => {
  return (
    <CollapseExpandIcon
      {...props}
      className={toClasses(styles.collapseExpand, isCollapsed && styles.isCollapsed)}
    />
  );
};

CollapseExpand.propTypes = {
  isCollapsed: PropTypes.bool
};
