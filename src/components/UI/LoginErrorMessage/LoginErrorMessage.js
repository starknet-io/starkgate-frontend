import PropTypes from 'prop-types';
import React from 'react';

import styles from './LoginErrorMessage.module.scss';

export const LoginErrorMessage = ({message}) => {
  return <div className={styles.loginErrorMessage}>❗ {message}</div>;
};

LoginErrorMessage.propTypes = {
  message: PropTypes.string
};
