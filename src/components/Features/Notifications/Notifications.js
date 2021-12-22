import React, {useRef} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {ReactComponent as EthereumLogo} from '../../../assets/svg/tokens/eth.svg';
import {ActionType, NetworkType, TransactionStatus} from '../../../enums';
import {useColors, usePrevious} from '../../../hooks';
import {useTransactions} from '../../../providers/TransactionsProvider';
import {getFullTime} from '../../../utils';
import {ToastBody} from '../../UI/Toast/ToastBody/ToastBody';
import {ToastButton, ToastButtons} from '../../UI/Toast/ToastButton/ToastButton';
import {ToastHeader} from '../../UI/Toast/ToastHeader/ToastHeader';
import {ToastSeparator} from '../../UI/Toast/ToastSeparator/ToastSeparator';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const {transactions} = useTransactions();
  const prevTransactions = usePrevious(transactions);
  const toastsMap = useRef({});
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
      handleTransferFromStarknetToast(tx, prevTx);
    }
  };

  const handleTransferToStarknetToast = (tx, prevTx) => {
    const isChanged = prevTx && tx.status !== prevTx.status;
    if (pendingStatuses.includes(tx.status)) {
      showLoadingPendingTransactionToast(tx);
    } else if (isChanged && tx.status === TransactionStatus.ACCEPTED_ON_L2) {
      showCompletedPendingTransactionToast(tx);
    }
  };

  const handleTransferFromStarknetToast = (tx, prevTx) => {
    if (pendingStatuses.includes(tx.status)) {
      showLoadingPendingTransactionToast(tx);
    } else if (!tx.eth_hash && tx.status === TransactionStatus.ACCEPTED_ON_L1) {
      showFinalizeWithdrawalToast(tx);
    }
  };

  const showLoadingPendingTransactionToast = tx => {
    let toastId = getToastId(tx);
    if (!toastId) {
      toastId = toast.loading(renderPendingTransactionToast({tx, isLoading: true}));
      toastsMap.current[tx.id] = toastId;
    }
  };

  const showCompletedPendingTransactionToast = tx => {
    const toastId = getToastId(tx);
    toastsMap.current[tx.id] = toast.success(renderPendingTransactionToast({tx}), {
      id: toastId
    });
  };

  const showFinalizeWithdrawalToast = tx => {
    const toastId = getToastId(tx);
    if (!toastId) {
      toastsMap.current[tx.id] = toast.custom(<FinalizeWithdrawalToast tx={tx} />, {
        id: toastId
      });
    }
  };

  const renderPendingTransactionToast = props => (
    <PendingTransactionToast {...props} onClose={() => onToastClose(props.tx)} />
  );

  const getToastId = tx => toastsMap.current[tx.id];

  const onToastClose = tx => {
    const toastId = getToastId(tx);
    toast.dismiss(toastId);
  };

  return (
    <Toaster
      position="top-right"
      containerClassName={styles.transactionToastContainer}
      toastOptions={{
        duration: Infinity
      }}
    />
  );
};

export const FinalizeWithdrawalToast = ({tx, onDismiss, onWithdrawal, onClose}) => {
  const {colorBeta, colorOmega1} = useColors();
  return (
    <div className={styles.finalizeWithdrawalToast}>
      <div className={styles.container}>
        <div className={styles.left}>
          <EthereumLogo style={{opacity: 0.5}} />
        </div>
        <div className={styles.right}>
          <ToastHeader
            title="StarkNet finished to process your withdrawal!"
            withClose={true}
            onClose={onClose}
          />
          <ToastBody
            style={{paddingRight: '20px'}}
            body="Click on Withdrawal to transfer the funds from StarkNet Bridge to your address."
          />
          <ToastButtons>
            <ToastButton color={colorOmega1} text="dismiss" onClick={onDismiss} />
            <ToastButton color={colorBeta} text="withdrawal" onClick={onWithdrawal} />
          </ToastButtons>
          <ToastSeparator />
          <TransactionDataBody tx={tx} style={{fontSize: '10px'}} />
        </div>
      </div>
    </div>
  );
};

export const PendingTransactionToast = ({tx, isLoading, onClose}) => {
  return (
    <div className={styles.pendingTransactionToast}>
      <ToastHeader
        title={
          tx.status === TransactionStatus.ACCEPTED_ON_L2
            ? 'Transaction consumed on StarkNet successfully'
            : 'Waiting for transaction to be consumed on StarkNet'
        }
        withClose={!isLoading}
        onClose={onClose}
      />
      <ToastSeparator />
      <TransactionDataBody tx={tx} style={{fontSize: '12px'}} />
    </div>
  );
};

export const TransactionDataBody = ({tx, style}) => {
  return (
    <>
      <ToastBody style={style} body={`${tx.amount} ${tx.symbol}`} />
      <ToastBody
        style={style}
        body={
          tx.type === ActionType.TRANSFER_TO_STARKNET
            ? `${NetworkType.ETHEREUM.name} -> ${NetworkType.STARKNET.name}`
            : `${NetworkType.STARKNET.name} -> ${NetworkType.ETHEREUM.name}`
        }
      />
      <ToastBody style={style} body={getFullTime(tx.timestamp)} />
    </>
  );
};
