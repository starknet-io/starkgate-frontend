import {useLocation} from 'react-router-dom';

import StarkGateLogoPath from '@assets/img/starkgate.png';
import {ReactComponent as LinkIcon} from '@assets/svg/icons/link.svg';
import {STARKNET_ECOSYSTEM_URL} from '@config/constants';
import {useTabsTranslation} from '@hooks';
import {useApp, useIsL1, useMenu, useSource} from '@providers';
import {openInNewTab, toClasses} from '@starkware-webapps/utils-browser';
import {ChainSelect, Divider, EthereumWalletButton, Image, StarknetWalletButton, Tabs} from '@ui';

import styles from './Header.module.scss';

export const Header = () => {
  const {showSourceMenu} = useMenu();
  const {navigateToRoute, isAcceptTerms} = useApp();
  const {pathname} = useLocation();
  const {discoverAppsTxt, termsTxt, faqTxt} = useTabsTranslation();
  const {selectDefaultSource} = useSource();
  const [, swapToL1] = useIsL1();

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
          <Image height={30} src={StarkGateLogoPath} width={250} />
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
