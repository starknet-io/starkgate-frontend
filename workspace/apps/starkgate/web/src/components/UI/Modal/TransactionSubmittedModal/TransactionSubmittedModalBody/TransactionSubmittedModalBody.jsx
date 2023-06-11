import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useTransactionSubmittedModalTranslation} from '@hooks';
import {isDeposit, isWithdrawal} from '@starkgate/shared';
import {Alert, AlertType, ModalText} from '@ui';

import styles from './TransactionSubmittedModalBody.module.scss';

const TransactionSubmittedModalBody = ({transfer}) => {
  const {
    completeTransferToL1Txt,
    transferToL1Txt,
    transferToL2Txt,
    transferToL2AlertTxt,
    transferAlertTitle
  } = useTransactionSubmittedModalTranslation();
  const {colorIris} = useColors();
  const {type, l2TxHash, l1TxHash, fastWithdrawal, autoWithdrawal} = transfer;
  const isTransferCompleted = l1TxHash && l2TxHash;

  const textMessage = isDeposit(type)
    ? transferToL2Txt
    : isTransferCompleted
    ? completeTransferToL1Txt
    : fastWithdrawal || autoWithdrawal
    ? ''
    : transferToL1Txt;

  const textStyle = {
    ...(isWithdrawal(type) && !isTransferCompleted ? {color: colorIris} : {width: '50%'})
  };

  return (
    <div className={styles.transactionSubmittedModalBody}>
      <ModalText style={textStyle}>{textMessage}</ModalText>
      {isDeposit(type) && (
        <Alert message={transferToL2AlertTxt} title={transferAlertTitle} type={AlertType.WARNING} />
      )}
    </div>
  );
};

TransactionSubmittedModalBody.propTypes = {
  transfer: PropTypes.object
};

export default TransactionSubmittedModalBody;
