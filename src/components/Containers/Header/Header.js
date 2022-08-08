import React, {Fragment} from 'react';
import useBreakpoint from 'use-breakpoint';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {ReactComponent as LiquidityIcon} from '../../../assets/svg/tabs/liquidity.svg';
import {Breakpoint} from '../../../enums';
import {useColors, useHeaderTranslation, useLiquidityProviders} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {toClasses} from '../../../utils';
import {Divider, Tab, BurgerMenu, StarknetWalletButton, EthereumWalletButton} from '../../UI';
import {ChainSelect} from '../../UI/ChainSelect/ChainSelect';
import styles from './Header.module.scss';

export const Header = () => {
  const {tabLiquidityTxt} = useHeaderTranslation();
  const {showTransferMenu} = useMenu();
  const {breakpoint} = useBreakpoint(Breakpoint);
  const {colorGamma} = useColors();
  const {navigateToRoute} = useApp();
  const liquidityProviders = useLiquidityProviders();

  const onLogoClick = () => {
    showTransferMenu();
    navigateToRoute('/');
  };

  const tabs = [
    {
      color: colorGamma,
      icon: <LiquidityIcon />,
      text: tabLiquidityTxt,
      disable: !liquidityProviders.length,
      onClick: () => navigateToRoute('liquidity')
    }
  ];

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        !tab.disable && (
          <Fragment key={index}>
            <Tab
              colorBorder={tab.color}
              iconLeft={tab.icon}
              text={tab.text}
              onClick={tab.onClick}
            />
            {index !== tabs.length - 1 && <Divider />}
          </Fragment>
        )
      );
    });
  };

  return (
    <div className={toClasses(styles.header, styles[breakpoint.toLowerCase()], 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <div className={toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <StarkGateLogo />
        </div>
        <ChainSelect />
      </div>
      <div className={toClasses(styles.right, 'row')}>
        {renderTabs()}
        {
          <>
            <Divider />
            <EthereumWalletButton />
            <StarknetWalletButton />
          </>
        }
        <BurgerMenu />
      </div>
    </div>
  );
};
