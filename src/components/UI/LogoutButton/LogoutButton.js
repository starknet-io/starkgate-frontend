import PropTypes from 'prop-types';
import React from 'react';

import {useColors, useTranslation} from '../../../hooks';
import {Button} from '../index';

export const LogoutButton = ({onClick, isDisabled}) => {
  const {logoutBtnTxt} = useTranslation('menus.account');
  const {colorAlpha5, colorWhite} = useColors();

  return (
    <Button
      colorBackground={colorAlpha5}
      colorBorder={colorAlpha5}
      colorText={colorWhite}
      height={50}
      isDisabled={isDisabled}
      style={{
        marginTop: '25px',
        width: '100%',
        borderRadius: '7px',
        fontSize: '16px'
      }}
      text={logoutBtnTxt}
      onClick={onClick}
    />
  );
};

LogoutButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool
};
