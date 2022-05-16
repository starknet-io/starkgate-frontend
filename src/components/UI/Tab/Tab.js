import PropTypes from 'prop-types';
import React from 'react';

import {useColors} from '../../../hooks';
import {Button} from '../Button/Button';
import styles from './Tab.module.scss';

export const Tab = props => {
  const {colorWhite, colorWhiteOp10, colorWhiteOp20} = useColors();

  return (
    <Button
      className={styles.tab}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorWhiteOp20}
      colorText={colorWhite}
      height={0}
      {...props}
    />
  );
};

Tab.propTypes = {
  props: PropTypes.object
};
