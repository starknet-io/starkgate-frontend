import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {Alert, AlertType} from '../../Alert/Alert';
import styles from './WalletErrorAlert.module.scss';

export const WalletErrorAlert = ({error}) => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    setShowError(true);
  }, [error]);

  const onAlertClose = () => {
    setShowError(false);
  };

  return error && showError ? (
    <div className={styles.walletErrorAlert}>
      <Alert
        closable={true}
        message={error.message}
        title={error.name}
        type={AlertType.ERROR}
        onClose={onAlertClose}
      />
    </div>
  ) : null;
};

WalletErrorAlert.propTypes = {
  error: PropTypes.object
};
