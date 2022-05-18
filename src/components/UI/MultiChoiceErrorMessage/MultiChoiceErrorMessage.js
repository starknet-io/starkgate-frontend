import PropTypes from 'prop-types';
import React from 'react';

import styles from './MultiChoiceErrorMessage.module.scss';

export const MultiChoiceErrorMessage = ({message}) => {
  return <div className={styles.multiChoiceErrorMessage}>❗ {message}</div>;
};

MultiChoiceErrorMessage.propTypes = {
  message: PropTypes.string
};
