import PropTypes from 'prop-types';
import React from 'react';

import styles from './Tab.module.scss';

export const Tab = ({onClick, label, style}) => {
  return (
    <button className={styles.tab} style={style} onClick={onClick}>
      {label}
    </button>
  );
};
Tab.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};
