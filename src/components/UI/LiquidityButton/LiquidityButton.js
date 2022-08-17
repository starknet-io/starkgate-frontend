import React from 'react';

import {ReactComponent as LiquidityIcon} from '../../../assets/svg/tabs/liquidity.svg';
import {useColors, useHeaderTranslation} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {Button} from '../Button/Button';
import styles from './LiquidityButton.module.scss';

export const LiquidityButton = () => {
  const {colorWhite, colorWhiteOp10, colorWhiteOp20} = useColors();
  const {colorGamma} = useColors();
  const {navigateToRoute} = useApp();
  const {liquidityBtnTxt} = useHeaderTranslation();

  const onClick = () => {
    navigateToRoute('liquidity');
  };

  return (
    <Button
      className={styles.liquidityButton}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorWhiteOp20}
      colorBorder={colorGamma}
      colorText={colorWhite}
      height={0}
      iconLeft={<LiquidityIcon />}
      text={liquidityBtnTxt}
      onClick={onClick}
    />
  );
};
