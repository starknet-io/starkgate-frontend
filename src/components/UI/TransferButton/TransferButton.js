import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import utils from '../../../utils';
import {Button} from '../index';

export const TransferButton = props => {
  const {colorBeta, colorWhite} = useColors();
  const {transferBtnTxt} = utils.getTranslation('menus.transfer');

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
