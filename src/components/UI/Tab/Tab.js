import PropTypes from 'prop-types';
import React from 'react';

import styles from './Tab.module.scss';

export const Tab = ({onClick, label}) => {
  return (
    <button className={styles.tab} onClick={() => onClick()}>
      {label}
    </button>
  );
};
Tab.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};
