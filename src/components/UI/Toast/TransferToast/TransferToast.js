import PropTypes from 'prop-types';
import React from 'react';

import {isConsumed, isPending, isRejected} from '../../../../enums';
import {TransferData} from '../../../Features';
import {ToastFooter, TransferLogLink} from '../ToastFooter/ToastFooter';
import {ToastHeader} from '../ToastHeader/ToastHeader';
import {ToastSeparator} from '../ToastSeparator/ToastSeparator';
import {CONSUMED_TXT, PENDING_TXT, REJECTED_TXT} from './TransferToast.strings';

export const TransferToast = ({transfer, isLoading, onTransferLogLink, onClose}) => {
  const getTitle = () => {
    const {status} = transfer;
    if (isPending(status)) {
      return PENDING_TXT;
    }
    if (isConsumed(status)) {
      return CONSUMED_TXT;
    }
    if (isRejected(status)) {
      return REJECTED_TXT;
    }
  };

  return (
    <div>
      <ToastHeader title={getTitle()} withClose={!isLoading} onClose={onClose} />
      <ToastSeparator />
      <TransferData style={{fontSize: '12px'}} transfer={transfer} />
      <ToastFooter>
        <TransferLogLink onClick={onTransferLogLink} />
      </ToastFooter>
    </div>
  );
};

TransferToast.propTypes = {
  transfer: PropTypes.object,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  onTransferLogLink: PropTypes.func
};
