import PropTypes from 'prop-types';
import React from 'react';

import {ActionType} from '../../../../enums/ActionType';
import {useTransactionSubmittedModalTranslation} from '../../../../hooks';
import {TransferToL1Message, TransferToL2Message} from '../ModalMessage';
import {ModalText} from '../ModalText/ModalText';
import styles from './TransactionSubmittedModal.module.scss';

const TransactionSubmittedModal = ({transfer}) => {
  const {completeTransferToL1Txt, transferToL1Txt, transferToL2Txt} =
    useTransactionSubmittedModalTranslation();
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
      <TransferToL2Message />
    ) : !isTransferCompleted ? (
      <TransferToL1Message />
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
