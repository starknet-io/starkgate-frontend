import PropTypes from 'prop-types';
import React from 'react';

import {useAccountTranslation, useColors} from '../../../hooks';
import {Button} from '../index';

export const LogoutButton = ({onClick, isDisabled}) => {
  const {logoutBtnTxt} = useAccountTranslation();
  const {colorDarkSlateBlue, colorWhite} = useColors();

  return (
    <Button
      colorBackground={colorDarkSlateBlue}
      colorBorder={colorDarkSlateBlue}
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
