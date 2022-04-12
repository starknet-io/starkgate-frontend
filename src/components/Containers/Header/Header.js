import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';

import {track} from '../../../analytics';
import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import constants from '../../../config/constants';
import {Breakpoint} from '../../../enums';
import {useColors} from '../../../hooks';
import {useLogin} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1, useIsL2} from '../../../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import utils from '../../../utils';
import {Tab, WalletButton} from '../../UI';
import styles from './Header.module.scss';
import {CHAIN_TXT, TAB_DISCORD_TXT, TAB_FAQ_TXT, TAB_TERMS_TXT} from './Header.strings';

const {DISCORD_LINK_URL} = constants;

export const Header = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {showAccountMenu, showTransferMenu} = useMenu();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {account: l1Account, config: l1Config} = useL1Wallet();
  const {account: l2Account, config: l2Config} = useL2Wallet();
  const {breakpoint} = useBreakpoint(Breakpoint);
  const {colorDiscord, colorWhiteOp50} = useColors();
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

  const onTabFaqClick = () => {
    navigate('/faq');
  };

  const onTabTermsClick = () => {
    navigate('/terms');
  };

  const onTabDiscordClick = () => {
    track(TrackEvent.DISCORD_TAB_CLICK);
    utils.browser.openInNewTab(DISCORD_LINK_URL);
  };

  return (
    <div className={utils.object.toClasses(styles.header, styles[breakpoint.toLowerCase()], 'row')}>
      <div className={utils.object.toClasses(styles.left, 'row')}>
        <div className={utils.object.toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <StarkGateLogo />
        </div>
        <div className={utils.object.toClasses(styles.chain, 'row')}>{CHAIN_TXT}</div>
      </div>
      <div className={utils.object.toClasses(styles.right, 'row')}>
        <Tab color={colorDiscord} label={TAB_DISCORD_TXT} onClick={onTabDiscordClick} />
        <Tab color={colorWhiteOp50} label={TAB_TERMS_TXT} onClick={onTabTermsClick} />
        <Tab color={colorWhiteOp50} label={TAB_FAQ_TXT} onClick={onTabFaqClick} />
        {isLoggedIn && (
          <WalletButton
            account={l1Account}
            logoPath={l1Config?.logoPath}
            onClick={onL1WalletButtonClick}
          />
        )}
        {isLoggedIn && (
          <WalletButton
            account={l2Account}
            logoPath={l2Config?.logoPath}
            onClick={onL2WalletButtonClick}
          />
        )}
      </div>
    </div>
  );
};
