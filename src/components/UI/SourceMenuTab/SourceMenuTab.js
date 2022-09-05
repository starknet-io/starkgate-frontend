import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils';
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
