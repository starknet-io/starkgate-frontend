import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import {Button} from '../Button/Button';
import styles from './Tab.module.scss';

export const Tab = ({label, color, onClick}) => {
  const {colorWhite, colorWhiteOp10, colorWhiteOp20} = useColors();

  return (
    <Button
      className={styles.tab}
      colorBorder={color || colorWhite}
      colorText={colorWhite}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorWhiteOp20}
      height={0}
      text={label}
      onClick={onClick}
    />
  );
};
Tab.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};
