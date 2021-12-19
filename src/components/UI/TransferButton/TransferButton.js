import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import {Button} from '../index';
import {BTN_TXT} from './TransferButton.strings';

export const TransferButton = props => {
  const {colorBeta, colorWhite} = useColors();

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
      text={BTN_TXT}
      {...props}
    />
  );
};

TransferButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool
};
