import React, {useRef} from 'react';
import {toast, Toaster} from 'react-hot-toast';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {ReactComponent as EthereumLogo} from '../../../assets/svg/tokens/eth.svg';
import {ActionType, NetworkType, TransactionStatus} from '../../../enums';
import {useColors, usePrevious} from '../../../hooks';
import {useTransactions} from '../../../providers/TransactionsProvider';
import {getFullTime} from '../../../utils';
import {ToastBody, ToastButton, ToastButtons, ToastHeader, ToastSeparator} from '../../UI';
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
      toastId = toast.loading(renderPendingTransactionToast({tx, isLoading: true}));
      toastsMap.current[tx.id] = toastId;
    }
  };

  const showConsumedTransactionToast = tx => {
    const toastId = getToastId(tx);
    toastsMap.current[tx.id] = toast.success(renderPendingTransactionToast({tx}), {
      id: toastId
    });
  };

  const showWithdrawalToast = tx => {
    const toastId = getToastId(tx);
    if (!toastId) {
      toastsMap.current[tx.id] = toast.custom(<WithdrawalTransactionToast tx={tx} />, {
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

export const WithdrawalTransactionToast = ({tx, onDismiss, onWithdrawal, onClose}) => {
  const {colorBeta, colorOmega1} = useColors();
  return (
    <div className={styles.withdrawalTransactionToast}>
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
            body="Click on Withdrawal to transfer the funds from StarkNet Bridge to your Ethereum address."
          />
          <ToastButtons>
            <ToastButton color={colorOmega1} text="dismiss" onClick={onDismiss} />
            <ToastButton color={colorBeta} text="withdrawal" onClick={onWithdrawal} />
          </ToastButtons>
          <ToastSeparator />
          <TransactionData tx={tx} style={{fontSize: '10px'}} />
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
      <TransactionData tx={tx} style={{fontSize: '12px'}} />
    </div>
  );
};

export const TransactionData = ({tx, style}) => {
  return (
    <>
      <ToastBody
        style={style}
        body={
          tx.type === ActionType.TRANSFER_TO_STARKNET
            ? `${NetworkType.ETHEREUM.name} -> ${NetworkType.STARKNET.name}`
            : `${NetworkType.STARKNET.name} -> ${NetworkType.ETHEREUM.name}`
        }
      />
      <ToastBody style={style} body={`${tx.amount} ${tx.symbol}`} />
      <ToastBody style={style} body={getFullTime(tx.timestamp)} />
    </>
  );
};
