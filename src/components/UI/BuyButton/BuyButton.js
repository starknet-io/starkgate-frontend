import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import {Button, DynamicIcon} from '../index';
import {LOGO_SIZE} from './BuyButton.constants';

export const BuyButton = ({btnTxt, logoPath, onClick}) => {
  const {colorGamma, colorWhite} = useColors();

  return (
    <Button
      colorBackground="transparent"
      colorBorder={colorGamma}
      colorText={colorWhite}
      height={40}
      icon={<DynamicIcon path={logoPath} size={LOGO_SIZE} />}
      style={{borderWidth: '2px'}}
      text={btnTxt}
      onClick={onClick}
    />
  );
};

BuyButton.propTypes = {
  btnTxt: PropTypes.string,
  logoPath: PropTypes.string,
  onClick: PropTypes.func
};
