import PropTypes from 'prop-types';
import React from 'react';

import {useTransferTranslation} from '@hooks';
import {useAmount} from '@providers';
import {MainMenuButton} from '@ui';

export const TransferButton = ({isDisabled, ...props}) => {
  const {transferBtnTxt, amountBtnTxt} = useTransferTranslation();
  const [amount] = useAmount();

  const textAndStyle = !amount
    ? {
        text: amountBtnTxt,
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
  isDisabled: PropTypes.bool
};
