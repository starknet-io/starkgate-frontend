import PropTypes from 'prop-types';
import React from 'react';

import {useConstants} from '@hooks';
import {
  NetworkType,
  TransactionStatus,
  TransactionStatusFriendlyMessage,
  TransactionStatusStep,
  isOnChain,
  isRejected
} from '@starkware-webapps/enums';
import {evaluate, getFullTime, shortenBalance} from '@starkware-webapps/utils';
import {toClasses} from '@starkware-webapps/utils-browser';

import {CircleLogo, CircleLogoSize} from '../../CircleLogo/CircleLogo';
import {LinkButton} from '../../LinkButton/LinkButton';
import styles from './TransactionLogItem.module.scss';

export const TransactionLogItem = ({transaction, onTransactionClick}) => {
  const {STARKSCAN_TX_URL} = useConstants();
  const {symbol, timestamp, name, amount, status, transactionHash} = transaction;

  const renderTransactionStatus = () => {
    return !isOnChain(status) ? (
      <div className={toClasses(styles.data, isRejected(status) && styles.error)}>
        {TransactionStatusFriendlyMessage[status || TransactionStatus.NOT_RECEIVED]}
      </div>
    ) : null;
  };

  const renderL2TxButton = () => {
    return (
      <LinkButton
        isDisabled={
          !transactionHash ||
          !status ||
          TransactionStatusStep[status] < TransactionStatusStep[TransactionStatus.RECEIVED]
        }
        text={`${NetworkType.L2} Tx`}
        url={evaluate(STARKSCAN_TX_URL, {transactionHash})}
        onClick={onTransactionClick}
      />
    );
  };

  return (
    <>
      <div className={styles.transactionLogItem}>
        <div className={styles.left}>
          <CircleLogo path={`tokens/${symbol}`} size={CircleLogoSize.XS} />
          <div>
            <div className={styles.label}>{name}</div>
            <div className={styles.data}>{`${getFullTime(timestamp)}`}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.label}>
            {shortenBalance(amount)} {symbol}
          </div>
          {renderTransactionStatus()}
          <div className={styles.links}>{renderL2TxButton()}</div>
        </div>
      </div>
    </>
  );
};

TransactionLogItem.propTypes = {
  transaction: PropTypes.object,
  onTransactionClick: PropTypes.func
};
