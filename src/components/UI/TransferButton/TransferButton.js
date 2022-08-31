import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {MainMenuButton} from '../index';

export const TransferButton = props => {
  const {transferBtnTxt, disabledTransferBtnTxt} = useTransferTranslation();

  return (
    <MainMenuButton text={props.isDisabled ? disabledTransferBtnTxt : transferBtnTxt} {...props} />
  );
};

TransferButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool
};
