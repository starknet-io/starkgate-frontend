import PropTypes from 'prop-types';
import React from 'react';

import {useAccountTranslation, useColorsWrapper} from '../../../hooks';
import {Button} from '../index';

export const LogoutButton = ({onClick, isDisabled}) => {
  const {logoutBtnTxt} = useAccountTranslation();
  const {colorIndigo, colorWhite} = useColorsWrapper();

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
