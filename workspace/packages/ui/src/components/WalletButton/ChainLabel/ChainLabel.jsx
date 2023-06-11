import PropTypes from 'prop-types';
import React from 'react';

import styles from './ChainLabel.module.scss';

export const ChainLabel = ({chain}) => {
  return <div className={styles.chainLabel}>{chain}</div>;
};

ChainLabel.propTypes = {
  chain: PropTypes.string
};
