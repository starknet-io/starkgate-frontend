import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';

import {TrackEvent} from '../../../analytics';
import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {ReactComponent as BuyIcon} from '../../../assets/svg/tabs/buy.svg';
import {ReactComponent as DiscordIcon} from '../../../assets/svg/tabs/discord.svg';
import {Breakpoint, ChainType} from '../../../enums';
import {useColors, useConstants, useEnvs, useTracking, useHeaderTranslation} from '../../../hooks';
import {useLogin} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1, useIsL2} from '../../../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import {openInNewTab, toClasses} from '../../../utils';
import {Divider, Tab, WalletButton} from '../../UI';
import styles from './Header.module.scss';

export const Header = () => {
  const {DISCORD_LINK_URL} = useConstants();
  const [trackDiscordClick] = useTracking(TrackEvent.DISCORD_TAB_CLICK);
  const {supportedL1ChainId} = useEnvs();
  const {tabDiscordTxt, tabFaqTxt, tabTermsTxt, chainTxt} = useHeaderTranslation();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {showAccountMenu, showTransferMenu} = useMenu();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {account: l1Account, config: l1Config} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const {breakpoint} = useBreakpoint(Breakpoint);
  const {colorDiscord, colorWhiteOp50, colorGamma} = useColors();
  const {isLoggedIn} = useLogin();

  const maybeNavigateToBridge = () => {
    pathname !== '/' && navigate('/');
  };

  const onL2WalletButtonClick = () => {
    swapToL2();
    showAccountMenu();
    maybeNavigateToBridge();
  };

  const onL1WalletButtonClick = () => {
    swapToL1();
    showAccountMenu();
    maybeNavigateToBridge();
  };

  const onLogoClick = () => {
    showTransferMenu();
    maybeNavigateToBridge();
  };

  const onRouteTabClick = route => {
    navigate(`/${route}`);
  };

  const onTabDiscordClick = () => {
    trackDiscordClick();
    openInNewTab(DISCORD_LINK_URL);
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
        <Tab
          colorBorder={colorDiscord}
          icon={<DiscordIcon />}
          text={tabDiscordTxt}
          onClick={onTabDiscordClick}
        />
        <Divider />
        <Tab
          colorBorder={colorGamma}
          icon={<BuyIcon />}
          text={'Buy onto L2'}
          onClick={() => onRouteTabClick('buy')}
        />
        <Divider />
        <Tab
          colorBorder={colorWhiteOp50}
          text={tabTermsTxt}
          onClick={() => onRouteTabClick('terms')}
        />
        <Tab colorBorder={colorWhiteOp50} text={tabFaqTxt} onClick={() => onRouteTabClick('faq')} />
        {isLoggedIn && (
          <>
            <Divider />
            <WalletButton
              account={l1Account}
              logoPath={l1Config?.logoPath}
              onClick={onL1WalletButtonClick}
            />
            <WalletButton
              account={l2Account}
              logoPath={l2Config?.logoPath}
              onClick={onL2WalletButtonClick}
            />
          </>
        )}
      </div>
    </div>
  );
};
