import React from 'react';

import {useTransactionSubmittedModalTranslation} from '../../../../../hooks/useTranslation';
import {DynamicIcon} from '../../../DynamicIcon/DynamicIcon';
import {ModalTitle} from '../../ModalTitle/ModalTitle';
import styles from './TransactionSubmittedModalHeader.module.scss';

const TransactionSubmittedModalHeader = () => {
  const {titleTxt} = useTransactionSubmittedModalTranslation();
  const icon = 'icons/rocket.svg';

  return (
    <div className={styles.transactionSubmittedModalHeader}>
      {icon && <DynamicIcon path={icon} size={29} />}
      <ModalTitle>{titleTxt}</ModalTitle>
    </div>
  );
};

export default TransactionSubmittedModalHeader;
