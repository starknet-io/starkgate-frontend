import PropTypes from 'prop-types';
import React from 'react';

import utils from '../../../utils';
import styles from './TransferMenuTab.module.scss';

export const TransferMenuTab = ({text, isActive, onClick}) => (
  <div
    className={utils.object.toClasses(styles.transferMenuTab, isActive && styles.isActive)}
    onClick={onClick}
  >
    {text}
  </div>
);

TransferMenuTab.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
