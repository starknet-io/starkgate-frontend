import React from 'react';

import styles from './ErrorModal.module.scss';

const ErrorModal = ({text}) => {
  return <div className={styles.errorModal}>{text}</div>;
};

export default ErrorModal;
