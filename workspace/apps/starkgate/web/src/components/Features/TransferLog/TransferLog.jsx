import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {useColors, useTransferLogTranslation} from '@hooks';
import {useTransfer} from '@providers';
import {isDeposit, isPendingWithdrawal} from '@starkgate/shared';
import {
  TransactionStatus,
  TransactionStatusFriendlyMessage,
  isOnChain,
  isRejected
} from '@starkware-webapps/enums';
import {getFullTime} from '@starkware-webapps/utils';
import {toClasses} from '@starkware-webapps/utils-browser';
import {BlockExplorer, Button, CircleLogo, CircleLogoSize} from '@ui';

import styles from './TransferLog.module.scss';

export const TransferLog = ({transfer, onCompleteTransferClick, onTxClick}) => {
  const {
    type,
    symbol,
    l1TxTimestamp,
    l2TxTimestamp,
    name,
    amount,
    l2TxStatus,
    l1TxHash,
    l2TxHash,
    autoWithdrawal
  } = transfer;
  const [sign, setSign] = useState('');
  const {action, isL1} = useTransfer();
  const {waitingToBeCompletedMsg} = useTransferLogTranslation();

  useEffect(() => {
    setSign(type === action ? '-' : '+');
  }, [action]);

  const renderTransferStatus = () => {
    return (
      <div
        className={toClasses(styles.data, styles.status, isRejected(l2TxStatus) && styles.error)}
      >
        {isOnChain(l2TxStatus)
          ? autoWithdrawal
            ? waitingToBeCompletedMsg
            : ''
          : TransactionStatusFriendlyMessage[l2TxStatus || TransactionStatus.NOT_RECEIVED]}
      </div>
    );
  };

  const renderL1TxButton = () => {
    return isL1 && isPendingWithdrawal(transfer) ? (
      <CompleteTransferButton onClick={onCompleteTransferClick} />
    ) : (
      <BlockExplorer isDisabled={!l1TxHash} isL1={true} tx={l1TxHash} onClick={onTxClick} />
    );
  };

  const renderL2TxButton = () => {
    return (
      <BlockExplorer
        isDisabled={!l2TxHash || !l2TxStatus}
        isL1={false}
        tx={l2TxHash}
        onClick={onTxClick}
      />
    );
  };

  return (
    <>
      <div className={styles.transferLog}>
        <div className={styles.dataRow}>
          <div className={styles.left}>
            <CircleLogo path={`tokens/${symbol}`} size={CircleLogoSize.XS} />
            <div className={styles.label}>{name}</div>
          </div>
          <div className={styles.label}>
            {sign} {amount} {symbol.toUpperCase()}
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.data}>{`${getFullTime(
            isDeposit(type) ? l1TxTimestamp : l2TxTimestamp
          )}`}</div>
          {renderTransferStatus()}
        </div>
        <div className={styles.linksRow}>
          {renderL1TxButton()}
          {renderL2TxButton()}
        </div>
      </div>
    </>
  );
};

const CompleteTransferButton = ({onClick}) => {
  const {completeTransferBtnTxt} = useTransferLogTranslation();
  const {colorOrangeSoda} = useColors();

  return (
    <Button
      colorBackground="transparent"
      colorBorder={colorOrangeSoda}
      colorText={colorOrangeSoda}
      style={{
        fontSize: '12px',
        padding: '0 8px',
        lineHeight: '18px',
        fontWeight: '400',
        borderRadius: '5px',
        margin: '0'
      }}
      text={completeTransferBtnTxt}
      onClick={onClick}
    />
  );
};

CompleteTransferButton.propTypes = {
  onClick: PropTypes.func
};

TransferLog.propTypes = {
  transfer: PropTypes.object,
  onCompleteTransferClick: PropTypes.func,
  onTxClick: PropTypes.func
};
