import PropTypes from 'prop-types';
import React from 'react';

import {useTransactionSubmittedModalTranslation} from '@hooks';
import {isWithdrawal} from '@starkgate/shared';
import {DynamicIcon, ModalTitle} from '@ui';

import styles from './TransactionSubmittedModalHeader.module.scss';

const TransactionSubmittedModalHeader = ({transfer}) => {
  const {l1TxTitleTxt, l2TxTitleTxt} = useTransactionSubmittedModalTranslation();
  const {type, l1TxHash} = transfer;
  const icon = 'icons/rocket';

  const getTitleTxt = () => {
    return isWithdrawal(type) && !l1TxHash ? l2TxTitleTxt : l1TxTitleTxt;
  };

  return (
    <div className={styles.transactionSubmittedModalHeader}>
      {icon && <DynamicIcon path={icon} size={29} />}
      <ModalTitle>{getTitleTxt()}</ModalTitle>
    </div>
  );
};

TransactionSubmittedModalHeader.propTypes = {
  transfer: PropTypes.object
};
export default TransactionSubmittedModalHeader;
