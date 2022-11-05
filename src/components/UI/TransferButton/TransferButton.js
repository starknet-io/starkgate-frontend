import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '../../../hooks';
import {MainMenuButton} from '../index';

export const TransferButton = ({isDisabled, hasInputError, ...props}) => {
  const {transferBtnTxt, disabledTransferBtnTxt} = useTransferTranslation();

  const textAndStyle =
    isDisabled && !hasInputError
      ? {
          text: disabledTransferBtnTxt,
          style: {
            textTransform: 'none'
          }
        }
      : {
          text: transferBtnTxt
        };

  return <MainMenuButton isDisabled={isDisabled} {...textAndStyle} {...props} />;
};

TransferButton.propTypes = {
  isDisabled: PropTypes.bool,
  hasInputError: PropTypes.bool
};
