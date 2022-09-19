import {toClasses} from '@starkware-industries/commons-js-utils';
import React from 'react';
import {useLocation} from 'react-router-dom';

import {ReactComponent as StarkGateLogo} from '../../../assets/img/starkgate.svg';
import {useTabsTranslation} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useSource} from '../../../providers/SourceProvider';
import {useIsL1} from '../../../providers/TransferProvider';
import {Divider, ChainSelect, StarknetWalletButton, EthereumWalletButton, Tabs} from '../../UI';
import styles from './Header.module.scss';

export const Header = () => {
  const {showSourceMenu} = useMenu();
  const {navigateToRoute, isAcceptTerms} = useApp();
  const {pathname} = useLocation();
  const {termsTxt, faqTxt} = useTabsTranslation();
  const {selectDefaultSource} = useSource();
  const [, swapToL1] = useIsL1();

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
    selectDefaultSource();
    swapToL1();
    showSourceMenu();
    navigateToRoute('/');
  };

  return (
    <div className={toClasses(styles.header, 'row')}>
      <div className={toClasses(styles.left, 'row')}>
        <div className={toClasses(styles.logo, 'row')} onClick={onLogoClick}>
          <StarkGateLogo />
        </div>
        <ChainSelect />
      </div>
      <div className={toClasses(styles.right, 'row')}>
        <Tabs tabs={tabs} />
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
