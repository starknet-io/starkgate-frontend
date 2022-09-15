import PropTypes from 'prop-types';
import React from 'react';

import {ActionType} from '../../../../../enums';
import {useTransactionSubmittedModalTranslation} from '../../../../../hooks';
import {Alert, AlertType} from '../../../Alert/Alert';
import {ModalText} from '../../ModalText/ModalText';
import styles from './TransactionSubmittedModalBody.module.scss';

const TransactionSubmittedModalBody = ({transfer}) => {
  const {
    completeTransferToL1Txt,
    transferToL1Txt,
    transferToL1AlertTxt,
    transferToL2Txt,
    transferToL2AlertTxt,
    transferAlertTitle
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
      <Alert message={transferToL2AlertTxt} title={transferAlertTitle} type={AlertType.WARNING} />
    ) : !isTransferCompleted ? (
      <Alert message={transferToL1AlertTxt} title={transferAlertTitle} type={AlertType.WARNING} />
    ) : null;

  return (
    <div className={styles.transactionSubmittedModalBody}>
      <ModalText style={{width: '50%'}}>{textMessage}</ModalText>
      {messageComponent}
    </div>
  );
};

TransactionSubmittedModalBody.propTypes = {
  transfer: PropTypes.object
};

export default TransactionSubmittedModalBody;
