import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {ActionType, NetworkType, TransactionStatus} from '../../../enums';
import {usePrevious, useTransfer} from '../../../hooks';
import {useTransactions} from '../../../providers/TransactionsProvider';
import {getFullTime} from '../../../utils';
import {PendingTransactionToast, ToastBody, WithdrawalTransactionToast} from '../../UI';
import styles from './ToastProvider.module.scss';

export const ToastProvider = () => {
  const {transactions} = useTransactions();
  const prevTransactions = usePrevious(transactions);
  const toastsMap = useRef({});
  const toastsDismissed = useRef({});
  const {finalizeTransferFromStarknet} = useTransfer();
  const pendingStatuses = [
    TransactionStatus.NOT_RECEIVED,
    TransactionStatus.RECEIVED,
    TransactionStatus.PENDING
  ];

  useDeepCompareEffect(() => {
    transactions.forEach(tx => {
      const prevTx = prevTransactions?.find(prevTx => prevTx.id === tx.id);
      handleToast(tx, prevTx);
    });
  }, [transactions]);

  const handleToast = (tx, prevTx) => {
    if (tx.type === ActionType.TRANSFER_TO_STARKNET) {
      handleTransferToStarknetToast(tx, prevTx);
    } else {
      handleTransferFromStarknetToast(tx);
    }
  };

  const handleTransferToStarknetToast = (tx, prevTx) => {
    const isChanged = prevTx && tx.status !== prevTx.status;
    if (pendingStatuses.includes(tx.status)) {
      showPendingTransactionToast(tx);
    } else if (isChanged && tx.status === TransactionStatus.ACCEPTED_ON_L2) {
      showConsumedTransactionToast(tx);
    }
  };

  const handleTransferFromStarknetToast = tx => {
    if (pendingStatuses.includes(tx.status)) {
      showPendingTransactionToast(tx);
    } else if (!tx.eth_hash && tx.status === TransactionStatus.ACCEPTED_ON_L1) {
      showWithdrawalToast(tx);
    }
  };

  const showPendingTransactionToast = tx => {
    let toastId = getToastId(tx);
    if (!toastId) {
      toastId = toast.loading(renderPendingTransactionToast(tx, true));
      toastsMap.current[tx.id] = toastId;
    }
  };

  const showConsumedTransactionToast = tx => {
    const toastId = getToastId(tx);
    toastsMap.current[tx.id] = toast.success(renderPendingTransactionToast(tx), {
      id: toastId
    });
  };

  const showWithdrawalToast = tx => {
    const toastId = getToastId(tx);
    if (!toastId && !isToastDismissed(toastId)) {
      toastsMap.current[tx.id] = toast.custom(t => renderWithdrawalTransactionToast(t, tx), {
        id: toastId
      });
    }
  };

  const renderPendingTransactionToast = (tx, isLoading) => (
    <PendingTransactionToast tx={tx} isLoading={isLoading} onClose={() => dismissToast(tx)} />
  );

  const renderWithdrawalTransactionToast = (t, tx) => (
    <WithdrawalTransactionToast
      t={t}
      tx={tx}
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

export const TransactionData = ({tx, style}) => {
  return (
    <>
      <ToastBody
        body={
          tx.type === ActionType.TRANSFER_TO_STARKNET
            ? `${NetworkType.ETHEREUM.name} -> ${NetworkType.STARKNET.name}`
            : `${NetworkType.STARKNET.name} -> ${NetworkType.ETHEREUM.name}`
        }
        style={style}
      />
      <ToastBody body={`${tx.amount} ${tx.symbol}`} style={style} />
      <ToastBody body={getFullTime(tx.timestamp)} style={style} />
    </>
  );
};

TransactionData.propTypes = {
  tx: PropTypes.object,
  style: PropTypes.object
};
