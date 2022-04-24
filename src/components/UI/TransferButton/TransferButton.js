import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useTransferTranslation} from '../../../hooks';
import {Button} from '../index';

export const TransferButton = props => {
  const {colorBeta, colorWhite} = useColors();
  const {transferBtnTxt} = useTransferTranslation();

  return (
    <Button
      colorBackground={colorBeta}
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={50}
      style={{
        width: '100%',
        borderRadius: '7px',
        fontSize: '16px'
      }}
      text={transferBtnTxt}
      {...props}
    />
  );
};

TransferButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool
};
