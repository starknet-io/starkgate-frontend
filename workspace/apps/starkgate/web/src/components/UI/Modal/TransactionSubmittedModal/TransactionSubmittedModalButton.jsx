import PropTypes from 'prop-types';
import React from 'react';

import {isDeposit} from '@starkgate/shared';
import {BlockExplorer} from '@ui';

const TransactionSubmittedModalButton = ({transfer}) => {
  const {type, l2TxHash, l1TxHash} = transfer;
  const isTransferCompleted = !!(l1TxHash && l2TxHash);
  const isL1 = isDeposit(type) || isTransferCompleted;

  return <BlockExplorer isL1={isL1} isLarge={true} tx={isL1 ? l1TxHash : l2TxHash} />;
};

TransactionSubmittedModalButton.propTypes = {
  transfer: PropTypes.object,
  buttonProps: PropTypes.object
};

export default TransactionSubmittedModalButton;
