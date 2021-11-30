import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../../hooks';
import {Button} from '../../../UI';
import {BTN_TXT} from './TransferButton.strings';

export const TransferButton = ({onClick, isDisabled}) => {
  const {colorBeta, colorWhite} = useColors();

  return (
    <Button
      colorBackground={colorBeta}
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={50}
      isDisabled={isDisabled}
      style={{
        width: '100%',
        borderRadius: '7px',
        fontSize: '16px'
      }}
      text={BTN_TXT}
      onClick={onClick}
    />
  );
};

TransferButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool
};
