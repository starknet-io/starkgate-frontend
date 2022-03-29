import PropTypes from 'prop-types';
import React from 'react';

import {toClasses} from '../../../utils/object';
import styles from './Tab.module.scss';

export const Tab = ({label, isLink, onClick}) => {
  return (
    <button className={toClasses(styles.tab, isLink && styles.link)} onClick={onClick}>
      {label}
    </button>
  );
};
Tab.propTypes = {
  label: PropTypes.string,
  isLink: PropTypes.bool,
  onClick: PropTypes.func
};
