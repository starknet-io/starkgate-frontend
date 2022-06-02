import React, {Fragment} from 'react';
import useBreakpoint from 'use-breakpoint';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {ReactComponent as LiquidityIcon} from '../../../assets/svg/tabs/liquidity.svg';
import {Breakpoint, ChainType} from '../../../enums';
import {useColors, useEnvs, useHeaderTranslation, useLiquidityProviders} from '../../../hooks';
import {useApp, useLogin} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1, useIsL2} from '../../../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import {toClasses} from '../../../utils';
import {Divider, Tab, WalletButton, BurgerMenu} from '../../UI';
import styles from './Header.module.scss';

export const Header = () => {
  const {supportedL1ChainId} = useEnvs();
  const {tabLiquidityTxt, chainTxt} = useHeaderTranslation();
  const {showAccountMenu, showTransferMenu} = useMenu();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {account: accountL1, config: configL1} = useL1Wallet();
  const {account: accountL2, config: configL2} = useL2Wallet();
  const {breakpoint} = useBreakpoint(Breakpoint);
  const {colorGamma} = useColors();
  const {navigateToRoute} = useApp();
  const {isLoggedIn} = useLogin();
  const liquidityProviders = useLiquidityProviders();

  const onL2WalletButtonClick = () => {
    swapToL2();
    showAccountMenu();
    navigateToRoute('/');
  };

  const onL1WalletButtonClick = () => {
    swapToL1();
    showAccountMenu();
    navigateToRoute('/');
  };

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
            <Tab colorBorder={tab.color} icon={tab.icon} text={tab.text} onClick={tab.onClick} />
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
        {supportedL1ChainId === ChainType.L1.GOERLI && (
          <div className={toClasses(styles.chain, 'row')}>{chainTxt}</div>
        )}
      </div>
      <div className={toClasses(styles.right, 'row')}>
        {renderTabs()}
        {isLoggedIn && (
          <>
            <Divider />
            <WalletButton
              account={accountL1}
              logoPath={configL1?.logoPath}
              onClick={onL1WalletButtonClick}
            />
            <WalletButton
              account={accountL2}
              logoPath={configL2?.logoPath}
              onClick={onL2WalletButtonClick}
            />
          </>
        )}
        <BurgerMenu />
      </div>
    </div>
  );
};
