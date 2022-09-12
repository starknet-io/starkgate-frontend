import React from 'react';

import {ReactComponent as RocketIcon} from '../../../../../assets/svg/icons/rocket.svg';
import {useTransactionSubmittedModalTranslation} from '../../../../../hooks';
import {ModalTitle} from '../../ModalTitle/ModalTitle';
import styles from './TransactionSubmittedModalHeader.module.scss';

const TransactionSubmittedModalHeader = () => {
  const {titleTxt} = useTransactionSubmittedModalTranslation();

  return (
    <div className={styles.transactionSubmittedModalHeader}>
      <RocketIcon />
      <ModalTitle>{titleTxt}</ModalTitle>
    </div>
  );
};

export default TransactionSubmittedModalHeader;
