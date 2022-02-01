import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {
  ActionType,
  isConsumed,
  isOnChain,
  isPending,
  isRejected,
  NetworkType
} from '../../../enums';
import {useCompleteTransferToL1, usePrevious} from '../../../hooks';
import {useTransfers} from '../../../providers/TransfersProvider';
import {getFullTime} from '../../../utils';
import {useBridgeActions} from '../../Features/Bridge/Bridge.hooks';
import {useIsL1, useIsL2} from '../../Features/Transfer/Transfer.hooks';
import {ToastBody, TransferToast, CompleteTransferToL1Toast} from '../../UI';
import styles from './ToastProvider.module.scss';
import {ALPHA_DISCLAIMER_MSG} from './ToastProvider.strings';

export const ToastProvider = () => {
  const {transfers} = useTransfers();
  const prevTransfers = usePrevious(transfers);
  const toastsMap = useRef({});
  const toastsDismissed = useRef({});
  const completeTransferToL1 = useCompleteTransferToL1();
  const {showAccountMenu} = useBridgeActions();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();

  useEffect(() => {
    showAlphaDisclaimerToast();
  }, []);

  useDeepCompareEffect(() => {
    transfers.forEach(transfer => {
      const prevTransfer = prevTransfers?.find(prevTransfer => prevTransfer.id === transfer.id);
      handleToast(transfer, prevTransfer);
    });
  }, [transfers]);

  const handleToast = (transfer, prevTransfer) => {
    const {status, type} = transfer;
    const isChanged = prevTransfer && status !== prevTransfer.status;
    if (isPending(status)) {
      return showPendingTransferToast(transfer);
    }
    if (isChanged && isConsumed(status)) {
      return showConsumedTransferToast(transfer);
    }
    if (isChanged && isRejected(status)) {
      return showRejectedTransferToast(transfer);
    }
    if (!transfer.l1hash && type === ActionType.TRANSFER_TO_L1 && isOnChain(status)) {
      return showCompleteTransferToL1Toast(transfer);
    }
  };

  const showPendingTransferToast = transfer => {
    let toastId = getToastId(transfer);
    if (!toastId) {
      toastId = toast.loading(renderTransferToast(transfer, true));
      toastsMap.current[transfer.id] = toastId;
    }
  };

  const showAlphaDisclaimerToast = () => {
    toast.success(ALPHA_DISCLAIMER_MSG, {
      position: 'bottom-left',
      icon: '❗'
    });
  };

  const showConsumedTransferToast = transfer => {
    const toastId = getToastId(transfer);
    toastsMap.current[transfer.id] = toast.success(renderTransferToast(transfer), {
      id: toastId
    });
  };

  const showRejectedTransferToast = transfer => {
    const toastId = getToastId(transfer);
    toastsMap.current[transfer.id] = toast.error(renderTransferToast(transfer), {
      id: toastId
    });
  };

  const showCompleteTransferToL1Toast = transfer => {
    const toastId = getToastId(transfer);
    if (!toastId && !isToastDismissed(toastId)) {
      toastsMap.current[transfer.id] = toast.custom(
        t => renderCompleteTransferToL1Toast(t, transfer),
        {
          id: toastId
        }
      );
    }
  };

  const renderTransferToast = (transfer, isLoading) => (
    <TransferToast
      isLoading={isLoading}
      transfer={transfer}
      onClose={() => dismissToast(transfer)}
      onTransferLogLink={() => goToTransferLog(transfer)}
    />
  );

  const renderCompleteTransferToL1Toast = (t, transfer) => (
    <CompleteTransferToL1Toast
      t={t}
      transfer={transfer}
      onClose={() => dismissToast(transfer)}
      onCompleteTransfer={() => onCompleteTransferClick(transfer)}
      onDismiss={() => dismissToast(transfer)}
      onTransferLogLink={() => goToTransferLog(transfer)}
    />
  );

  const getToastId = transfer => toastsMap.current[transfer.id];

  const isToastDismissed = id => !!toastsDismissed[id];

  const dismissToast = transfer => {
    const toastId = getToastId(transfer);
    toast.dismiss(toastId);
    toastsDismissed.current[toastId] = true;
  };

  const onCompleteTransferClick = async transfer => {
    await completeTransferToL1(transfer);
    dismissToast(transfer);
  };

  const goToTransferLog = transfer => {
    transfer.type === ActionType.TRANSFER_TO_L2 ? swapToL1() : swapToL2();
    showAccountMenu({transferId: transfer.id});
  };

  return (
    <Toaster
      containerClassName={styles.toastProvider}
      position="top-right"
      toastOptions={{
        duration: Infinity
      }}
    />
  );
};

export const TransferData = ({transfer, style}) => {
  return (
    <>
      <ToastBody
        body={
          transfer.type === ActionType.TRANSFER_TO_L2
            ? `${NetworkType.L1.name} -> ${NetworkType.L2.name}`
            : `${NetworkType.L2.name} -> ${NetworkType.L1.name}`
        }
        style={style}
      />
      <ToastBody body={`${transfer.amount} ${transfer.symbol}`} style={style} />
      <ToastBody body={getFullTime(transfer.timestamp)} style={style} />
    </>
  );
};

TransferData.propTypes = {
  transfer: PropTypes.object,
  style: PropTypes.object
};
