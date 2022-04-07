import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {track} from '../../../analytics';
import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {Breakpoint} from '../../../enums';
import {useColors, useConstants, useTranslation} from '../../../hooks';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1, useIsL2} from '../../../providers/TransferProvider';
import {useL1Wallet, useL2Wallet, useWallets} from '../../../providers/WalletsProvider';
import utils from '../../../utils';
import {Tab, WalletButton} from '../../UI';
import styles from './Header.module.scss';

export const Header = () => {
  const {DISCORD_LINK_URL} = useConstants();
  const {tabDiscordTxt, tabFaqTxt, chainTxt} = useTranslation('containers.header');
  const {chainName, isConnected} = useWallets();
  const {showAccountMenu, showTransferMenu, showFaqMenu} = useMenu();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {account: l1Account, isConnected: isL1AccountConnected, config: l1Config} = useL1Wallet();
  const {account: l2Account, isConnected: isL2AccountConnected, config: l2Config} = useL2Wallet();
  const {breakpoint} = useBreakpoint(Breakpoint);
  const {colorDiscord, colorWhiteOp50} = useColors();

  const onL2WalletButtonClick = () => {
    swapToL2();
    showAccountMenu();
  };

  const onL1WalletButtonClick = () => {
    swapToL1();
    showAccountMenu();
  };

  const onLogoClick = () => {
    showTransferMenu();
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
        {isConnected && (
          <div className={utils.object.toClasses(styles.chain, 'row')}>
            {utils.string.capitalize(utils.object.evaluate(chainTxt, {chainName}))}
          </div>
        )}
      </div>

      <div className={utils.object.toClasses(styles.right, 'row')}>
        <Tab color={colorWhiteOp50} label={tabFaqTxt} onClick={showFaqMenu} />
        <Tab color={colorDiscord} label={tabDiscordTxt} onClick={onTabDiscordClick} />
        {isL1AccountConnected && (
          <WalletButton
            account={l1Account}
            logoPath={l1Config?.logoPath}
            onClick={onL1WalletButtonClick}
          />
        )}
        {isL2AccountConnected && (
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
