import PropTypes from 'prop-types';
import React from 'react';

import {useAccountTranslation, useColors} from '../../../hooks';
import {Button} from '../index';

export const LogoutButton = ({onClick, isDisabled}) => {
  const {logoutBtnTxt} = useAccountTranslation();
  const {colorIndigo, colorWhite} = useColors();

  return (
    <Button
      colorBackground={colorIndigo}
      colorBorder={colorIndigo}
      colorText={colorWhite}
      height={50}
      isDisabled={isDisabled}
      style={{
        margin: '0',
        width: '100%',
        borderRadius: '7px'
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
