import PropTypes from 'prop-types';
import React from 'react';

import {TransactionStatus} from '../../../../enums';
import {TransactionData} from '../../../Features/TransactionToastManager/TransactionToastManager';
import {ToastHeader} from '../ToastHeader/ToastHeader';
import {ToastSeparator} from '../ToastSeparator/ToastSeparator';
import styles from './PendingTransactionToast.module.scss';
import {CONSUMED_TXT, PENDING_TXT} from './PendingTransactionToast.strings';

export const PendingTransactionToast = ({tx, isLoading, onClose}) => {
  return (
    <div className={styles.pendingTransactionToast}>
      <ToastHeader
        title={tx.status === TransactionStatus.ACCEPTED_ON_L2 ? CONSUMED_TXT : PENDING_TXT}
        withClose={!isLoading}
        onClose={onClose}
      />
      <ToastSeparator />
      <TransactionData style={{fontSize: '12px'}} tx={tx} />
    </div>
  );
};

PendingTransactionToast.propTypes = {
  tx: PropTypes.object,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func
};
