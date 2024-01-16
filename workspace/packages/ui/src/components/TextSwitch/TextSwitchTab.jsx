import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '@starkware-webapps/utils-browser';

import styles from './TextSwitch.module.scss';

export const TextSwitchTab = ({text, isActive, onClick}) => (
  <div className={toClasses(styles.textSwitchTab, isActive && styles.isActive)} onClick={onClick}>
    <div className={toClasses(styles.textSwitchTabText)}>{text}</div>
  </div>
);

TextSwitchTab.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
