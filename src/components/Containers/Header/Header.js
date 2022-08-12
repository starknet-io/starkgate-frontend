import React from 'react';
import useBreakpoint from 'use-breakpoint';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {Breakpoint} from '../../../enums';
import {useApp} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {toClasses} from '../../../utils';
import {
  Divider,
  ChainSelect,
  StarknetWalletButton,
  EthereumWalletButton,
  Tabs,
  LiquidityButton
} from '../../UI';
import styles from './Header.module.scss';

export const Header = () => {
  const {showTransferMenu} = useMenu();
  const {breakpoint} = useBreakpoint(Breakpoint);
  const {navigateToRoute, isAcceptTerms} = useApp();

  const onLogoClick = () => {
    showTransferMenu();
    navigateToRoute('/');
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
        <Tabs />
        <Divider />
        <LiquidityButton />
        {isAcceptTerms && (
          <>
            <Divider />
            <EthereumWalletButton />
            <StarknetWalletButton />
          </>
        )}
      </div>
    </div>
  );
};
