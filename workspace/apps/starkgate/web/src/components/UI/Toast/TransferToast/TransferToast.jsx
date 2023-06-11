import PropTypes from 'prop-types';
import React from 'react';

import {TransferData} from '@features';
import {usePendingTransferToastTranslation} from '@hooks';
import {isConsumed, isPending, isRejected} from '@starkware-webapps/enums';
import {ToastFooter, ToastHeader, ToastSeparator, TransferLogLink} from '@ui';

export const TransferToast = ({transfer, isLoading, onTransferLogLinkClick, onClose}) => {
  const {pendingTxt, consumedTxt, rejectedTxt} = usePendingTransferToastTranslation();

  const getTitle = () => {
    const {l2TxStatus} = transfer;
    if (isPending(l2TxStatus)) {
      return pendingTxt;
    }
    if (isConsumed(l2TxStatus)) {
      return consumedTxt;
    }
    if (isRejected(l2TxStatus)) {
      return rejectedTxt;
    }
  };

  return (
    <div>
      <ToastHeader title={getTitle()} withClose={!isLoading} onClose={onClose} />
      <ToastSeparator />
      <TransferData transfer={transfer} />
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
