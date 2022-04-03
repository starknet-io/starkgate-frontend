import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import useBreakpoint from 'use-breakpoint';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {
  ActionType,
  Breakpoint,
  isConsumed,
  isMobile,
  isOnChain,
  isRejected,
  NetworkType,
  ToastType
} from '../../../enums';
import {useCompleteTransferToL1, usePrevious} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1, useIsL2} from '../../../providers/TransferProvider';
import {useTransfersLog} from '../../../providers/TransfersLogProvider';
import utils from '../../../utils';
import {CompleteTransferToL1Toast, ToastBody, TransferToast} from '../../UI';
import styles from './ToastProvider.module.scss';
import {ALPHA_DISCLAIMER_MSG} from './ToastProvider.strings';

const toastsMap = {};
const toastsDismissed = {};

export const ToastProvider = () => {
  const {transfers} = useTransfersLog();
  const prevTransfers = usePrevious(transfers);
  const completeTransferToL1 = useCompleteTransferToL1();
  const {showAccountMenu} = useMenu();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {breakpoint} = useBreakpoint(Breakpoint);

  useEffect(() => {
    showAlphaDisclaimerToast();
  }, [breakpoint]);

  useDeepCompareEffect(() => {
    transfers.forEach(transfer => {
      const prevTransfer = prevTransfers?.find(prevTransfer => prevTransfer.id === transfer.id);
      handleToast(transfer, prevTransfer);
    });
  }, [transfers]);

  const handleToast = (transfer, prevTransfer) => {
    const {status, type} = transfer;
    const isChanged = prevTransfer && status !== prevTransfer.status;
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

  const showAlphaDisclaimerToast = () => {
    toast.success(ALPHA_DISCLAIMER_MSG, {
      id: 'alphaDisclaimer',
      position: isMobile(breakpoint) ? 'bottom-center' : 'bottom-left',
      icon: '❗'
    });
  };

  const showConsumedTransferToast = transfer => {
    const {id} = transfer;
    if (toastShouldRender(id, ToastType.CONSUMED_TRANSFER)) {
      setToast(id, ToastType.CONSUMED_TRANSFER);
      toast.success(renderTransferToast(transfer, ToastType.CONSUMED_TRANSFER), {
        id
      });
    }
  };

  const showRejectedTransferToast = transfer => {
    const {id} = transfer;
    if (toastShouldRender(id, ToastType.REJECTED_TRANSFER)) {
      setToast(id, ToastType.REJECTED_TRANSFER);
      toast.error(renderTransferToast(transfer, ToastType.REJECTED_TRANSFER), {
        id
      });
    }
  };

  const showCompleteTransferToL1Toast = transfer => {
    const {id} = transfer;
    if (toastShouldRender(id, ToastType.COMPLETE_TRANSFER_TO_L1)) {
      setToast(id, ToastType.COMPLETE_TRANSFER_TO_L1);
      toast.custom(t => renderCompleteTransferToL1Toast(t, transfer), {
        id
      });
    }
  };

  const renderTransferToast = (transfer, type) => (
    <TransferToast
      isLoading={false}
      transfer={transfer}
      onClose={() => dismissToast(transfer.id, type)}
      onTransferLogLinkClick={() => goToTransferLog(transfer)}
    />
  );

  const renderCompleteTransferToL1Toast = (t, transfer) => {
    const type = ToastType.COMPLETE_TRANSFER_TO_L1;
    const {id} = transfer;
    return (
      <CompleteTransferToL1Toast
        t={t}
        transfer={transfer}
        onClose={() => dismissToast(id, type)}
        onCompleteTransfer={() => onCompleteTransferClick(transfer)}
        onDismiss={() => dismissToast(id, type)}
        onTransferLogLinkClick={() => goToTransferLog(transfer)}
      />
    );
  };

  const toastShouldRender = (id, type) => {
    return !isToastRendered(id, type) && !isToastDismissed(id, type);
  };

  const isToastRendered = (id, type) => {
    return toastsMap[type]?.[id];
  };

  const isToastDismissed = (id, type) => {
    return toastsDismissed[type]?.[id];
  };

  const setToast = (id, type) => {
    toastsMap[type] = toastsMap[type] || {};
    toastsMap[type][id] = true;
  };

  const dismissToast = (id, type) => {
    toastsDismissed[type] = toastsDismissed[type] || {};
    toastsDismissed[type][id] = true;
    toast.dismiss(id);
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
      <ToastBody body={utils.date.getFullTime(transfer.timestamp)} style={style} />
    </>
  );
};

TransferData.propTypes = {
  transfer: PropTypes.object,
  style: PropTypes.object
};
