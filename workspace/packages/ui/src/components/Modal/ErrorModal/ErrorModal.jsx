import PropTypes from 'prop-types';
import React from 'react';

import styles from './ErrorModal.module.scss';

export const ErrorModal = ({text}) => {
  return <div className={styles.errorModal}>{text}</div>;
};

ErrorModal.propTypes = {
  text: PropTypes.string
};
