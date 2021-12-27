import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {ActionType, NetworkType, TransactionStatus} from '../../../enums';
import {usePrevious, useTransfer} from '../../../hooks';
import {useTransfers} from '../../../providers/TransfersProvider';
import {getFullTime} from '../../../utils';
import {PendingTransferToast, ToastBody, WithdrawalTransferToast} from '../../UI';
import styles from './ToastProvider.module.scss';

export const ToastProvider = () => {
  const {transfers} = useTransfers();
  const prevTransfers = usePrevious(transfers);
  const toastsMap = useRef({});
  const toastsDismissed = useRef({});
  const {finalizeTransferFromStarknet} = useTransfer();
  const pendingStatuses = [TransactionStatus.NOT_RECEIVED, TransactionStatus.RECEIVED];
  const consumedStatus = [TransactionStatus.PENDING, TransactionStatus.ACCEPTED_ON_L2];

  useDeepCompareEffect(() => {
    transfers.forEach(transfer => {
      const prevTransfer = prevTransfers?.find(prevTransfer => prevTransfer.id === transfer.id);
      handleToast(transfer, prevTransfer);
    });
  }, [transfers]);

  const handleToast = (transfer, prevTransfer) => {
    if (transfer.type === ActionType.TRANSFER_TO_STARKNET) {
      handleTransferToStarknetToast(transfer, prevTransfer);
    } else {
      handleTransferFromStarknetToast(transfer);
    }
  };

  const handleTransferToStarknetToast = (transfer, prevTransfer) => {
    const isChanged = prevTransfer && transfer.status !== prevTransfer.status;
    if (pendingStatuses.includes(transfer.status)) {
      showPendingTransactionToast(transfer);
    } else if (isChanged && consumedStatus.includes(transfer.status)) {
      showConsumedTransactionToast(transfer);
    }
  };

  const handleTransferFromStarknetToast = transfer => {
    if (pendingStatuses.includes(transfer.status)) {
      showPendingTransactionToast(transfer);
    } else if (!transfer.eth_hash && transfer.status === TransactionStatus.ACCEPTED_ON_L1) {
      showWithdrawalToast(transfer);
    }
  };

  const showPendingTransactionToast = transfer => {
    let toastId = getToastId(transfer);
    if (!toastId) {
      toastId = toast.loading(renderPendingTransactionToast(transfer, true));
      toastsMap.current[transfer.id] = toastId;
    }
  };

  const showConsumedTransactionToast = transfer => {
    const toastId = getToastId(transfer);
    toastsMap.current[transfer.id] = toast.success(renderPendingTransactionToast(transfer), {
      id: toastId
    });
  };

  const showWithdrawalToast = transfer => {
    const toastId = getToastId(transfer);
    if (!toastId && !isToastDismissed(toastId)) {
      toastsMap.current[transfer.id] = toast.custom(
        t => renderWithdrawalTransactionToast(t, transfer),
        {
          id: toastId
        }
      );
    }
  };

  const renderPendingTransactionToast = (transfer, isLoading) => (
    <PendingTransferToast
      isLoading={isLoading}
      transfer={transfer}
      onClose={() => dismissToast(transfer)}
    />
  );

  const renderWithdrawalTransactionToast = (t, tx) => (
    <WithdrawalTransferToast
      t={t}
      transfer={tx}
      onClose={() => dismissToast(tx)}
      onDismiss={() => dismissToast(tx)}
      onWithdrawal={() => onWithdrawalClick(tx)}
    />
  );

  const getToastId = tx => toastsMap.current[tx.id];

  const isToastDismissed = id => !!toastsDismissed[id];

  const dismissToast = tx => {
    const toastId = getToastId(tx);
    toast.dismiss(toastId);
    toastsDismissed.current[toastId] = true;
  };

  const onWithdrawalClick = async tx => {
    await finalizeTransferFromStarknet(tx);
    dismissToast(tx);
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
          transfer.type === ActionType.TRANSFER_TO_STARKNET
            ? `${NetworkType.ETHEREUM.name} -> ${NetworkType.STARKNET.name}`
            : `${NetworkType.STARKNET.name} -> ${NetworkType.ETHEREUM.name}`
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
