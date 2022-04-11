import PropTypes from 'prop-types';
import React from 'react';

import {isConsumed, isPending, isRejected} from '../../../../enums';
import {useTranslation} from '../../../../hooks';
import {TransferData} from '../../../Features';
import {ToastFooter, TransferLogLink} from '../ToastFooter/ToastFooter';
import {ToastHeader} from '../ToastHeader/ToastHeader';
import {ToastSeparator} from '../ToastSeparator/ToastSeparator';

export const TransferToast = ({transfer, isLoading, onTransferLogLinkClick, onClose}) => {
  const {pendingTxt, consumedTxt, rejectedTxt} = useTranslation('toasts.pendingTransfer');

  const getTitle = () => {
    const {status} = transfer;
    if (isPending(status)) {
      return pendingTxt;
    }
    if (isConsumed(status)) {
      return consumedTxt;
    }
    if (isRejected(status)) {
      return rejectedTxt;
    }
  };

  return (
    <div>
      <ToastHeader title={getTitle()} withClose={!isLoading} onClose={onClose} />
      <ToastSeparator />
      <TransferData style={{fontSize: '12px'}} transfer={transfer} />
      <ToastFooter>
        <TransferLogLink onClick={onTransferLogLinkClick} />
      </ToastFooter>
    </div>
  );
};

TransferToast.propTypes = {
  transfer: PropTypes.object,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func,
  onTransferLogLinkClick: PropTypes.func
};
