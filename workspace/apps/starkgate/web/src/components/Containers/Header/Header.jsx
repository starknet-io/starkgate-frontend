import {useLocation} from 'react-router-dom';

import StarkGateLogoPath from '@assets/img/starkgate.png';
import {ReactComponent as LinkIcon} from '@assets/svg/icons/link.svg';
import {STARKNET_ECOSYSTEM_URL} from '@config/constants';
import {WalletButtons} from '@features';
import {useTabsTranslation} from '@hooks';
import {useApp, useIsL1, useMenu, useSource, useWalletLogin} from '@providers';
import {openInNewTab, toClasses} from '@starkware-webapps/utils-browser';
import {ChainSelect, Divider, Image, LoginWalletButton, Tabs} from '@ui';

import styles from './Header.module.scss';

export const Header = () => {
  const {showSourceMenu} = useMenu();
  const {navigateToRoute} = useApp();
  const {pathname} = useLocation();
  const {discoverAppsTxt, termsTxt, faqTxt} = useTabsTranslation();
  const {selectDefaultSource} = useSource();
  const [, swapToL1] = useIsL1();
  const {isDisconnected} = useWalletLogin();

  const tabs = [
    {
      text: discoverAppsTxt,
      icon: <LinkIcon />,
      onClick: () => openInNewTab(STARKNET_ECOSYSTEM_URL)
    },
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
    // {
    //   text: contactUsTxt,
    //   onClick: () => openInNewTab(CONTACT_US_LINK_URL)
    // }
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
          <Image height={40} src={StarkGateLogoPath} />
        </div>
        <ChainSelect />
      </div>
      <div className={toClasses(styles.right, 'row')}>
        <Tabs tabs={tabs} />
        <>
          <Divider />
          {isDisconnected ? (
            <LoginWalletButton className={styles.loginButton} />
          ) : (
            <WalletButtons />
          )}
        </>
      </div>
    </div>
  );
};
