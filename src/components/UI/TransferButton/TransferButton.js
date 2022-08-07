import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {MainWalletButton} from '../index';

export const TransferButton = props => {
  const {transferBtnTxt} = useTransferTranslation();

  return <MainWalletButton height={50} text={transferBtnTxt} {...props} />;
};

TransferButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool
};
