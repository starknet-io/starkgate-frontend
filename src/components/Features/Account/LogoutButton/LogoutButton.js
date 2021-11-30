import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../../hooks';
import {Button} from '../../../UI';
import {BTN_TXT} from './LogoutButton.strings';

export const LogoutButton = ({onClick}) => {
  const {colorAlpha5, colorWhite} = useColors();

  return (
    <Button
      colorBackground={colorAlpha5}
      colorBorder={colorAlpha5}
      colorText={colorWhite}
      height={50}
      style={{
        marginTop: '25px',
        width: '100%',
        borderRadius: '7px',
        fontSize: '16px'
      }}
      text={BTN_TXT}
      onClick={onClick}
    />
  );
};

LogoutButton.propTypes = {
  onClick: PropTypes.func
};
