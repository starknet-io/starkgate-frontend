import React from 'react';
import {useLocation} from 'react-router-dom';
import useBreakpoint from 'use-breakpoint';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {Breakpoint} from '../../../enums';
import {useEnvs, useTabsTranslation} from '../../../hooks';
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
  const {pathname} = useLocation();
  const {termsTxt, faqTxt} = useTabsTranslation();
  const {ENV_POC} = useEnvs();
  const tabs = [
    {
      text: termsTxt,
      isActive: pathname === '/terms',
      onClick: () => navigateToRoute('/terms')
    },
    {
      text: faqTxt,
      isActive: pathname === '/faq',
      onClick: () => navigateToRoute('/faq')
    }
  ];

  const onLogoClick = () => {
    showTransferMenu();
    navigateToRoute('/');
  };

  return (
    <div className={toClasses(styles.header, styles[breakpoint.toLowerCase()], 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <div className={toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <StarkGateLogo />
          {ENV_POC}
        </div>
        <ChainSelect />
      </div>
      <div className={toClasses(styles.right, 'row')}>
        <Tabs tabs={tabs} />
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
