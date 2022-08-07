import React from 'react';

import {useColors} from '../../../hooks';
import {toClasses} from '../../../utils';
import {Button} from '../index';
import styles from './MainWalletButton.module.scss';

export const MainWalletButton = ({text, onClick, ...props}) => {
  const {colorBeta, colorWhite} = useColors();

  return (
    <Button
      className={toClasses(styles.mainMenuButton)}
      colorBackground={colorBeta}
      colorBorder={colorBeta}
      colorText={colorWhite}
      height={50}
      text={text}
      onClick={onClick}
      {...props}
    />
  );
};
