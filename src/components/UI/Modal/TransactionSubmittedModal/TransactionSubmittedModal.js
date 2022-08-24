import PropTypes from 'prop-types';
import React from 'react';

import {ActionType} from '../../../../enums';
import {useTransactionSubmittedModalTranslation} from '../../../../hooks';
import {Alert, AlertType} from '../../Alert/Alert';
import {ModalText} from '../ModalText/ModalText';
import styles from './TransactionSubmittedModal.module.scss';

const TransactionSubmittedModal = ({transfer}) => {
  const {
    completeTransferToL1Txt,
    transferToL1Txt,
    transferToL1AlertTxt,
    transferToL2Txt,
    transferToL2AlertTxt
  } = useTransactionSubmittedModalTranslation();
  const {type, l2hash, l1hash} = transfer;
  const isTransferCompleted = l1hash && l2hash;

  const textMessage =
    type === ActionType.TRANSFER_TO_L2
      ? transferToL2Txt
      : isTransferCompleted
      ? completeTransferToL1Txt
      : transferToL1Txt;

  const messageComponent =
    type === ActionType.TRANSFER_TO_L2 ? (
      <Alert message={transferToL2AlertTxt} type={AlertType.WARNING} />
    ) : !isTransferCompleted ? (
      <Alert message={transferToL1AlertTxt} type={AlertType.WARNING} />
    ) : null;

  return (
    <div className={styles.transactionSubmittedModal}>
      <ModalText>{textMessage}</ModalText>
      {messageComponent}
    </div>
  );
};

TransactionSubmittedModal.propTypes = {
  transfer: PropTypes.object
};

export default TransactionSubmittedModal;
