import {toClasses} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './SourceMenuTab.module.scss';

export const SourceMenuTab = ({text, isActive, onClick}) => (
  <div className={toClasses(styles.sourceMenuTab, isActive && styles.isActive)} onClick={onClick}>
    {text}
  </div>
);

SourceMenuTab.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
