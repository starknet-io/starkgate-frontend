import PropTypes from 'prop-types';
import React from 'react';

import {TransactionStatus} from '../../../../enums';
import {TransferData} from '../../../Features';
import {ToastHeader} from '../ToastHeader/ToastHeader';
import {ToastSeparator} from '../ToastSeparator/ToastSeparator';
import styles from './PendingTransferToast.module.scss';
import {CONSUMED_TXT, PENDING_TXT} from './PendingTransferToast.strings';

export const PendingTransferToast = ({transfer, isLoading, onClose}) => {
  return (
    <div className={styles.pendingTransactionToast}>
      <ToastHeader
        title={transfer.status === TransactionStatus.ACCEPTED_ON_L2 ? CONSUMED_TXT : PENDING_TXT}
        withClose={!isLoading}
        onClose={onClose}
      />
      <ToastSeparator />
      <TransferData style={{fontSize: '12px'}} transfer={transfer} />
    </div>
  );
};

PendingTransferToast.propTypes = {
  transfer: PropTypes.object,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func
};
