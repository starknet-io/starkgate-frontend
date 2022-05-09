import React, {useEffect} from 'react';

import {setUser} from '../../analytics';
import {Account, SelectToken, ToastProvider, Transfer} from '../../components/Features';
import {MenuType} from '../../enums';
import {useEnvs, useMenuTracking} from '../../hooks';
import {BridgeProviders} from '../../providers';
import {useMenu} from '../../providers/MenuProvider';
import {useOnboardingModal} from '../../providers/ModalProvider';
import {useL1Wallet, useL2Wallet} from '../../providers/WalletsProvider';
import {getItem, getMsFromHrs, setItem} from '../../utils';
import styles from './Bridge.module.scss';

export const Bridge = () => {
  const trackMenu = useMenuTracking();
  const showOnboardingModal = useOnboardingModal();
  const {localStorageOnboardingExpirationTimestampKey, onboardingModalTimeoutHrs} = useEnvs();
  const {menu, menuProps} = useMenu();
  const {account: l1account} = useL1Wallet();
  const {account: l2account} = useL2Wallet();

  useEffect(() => {
    trackMenu(menu);
  }, [menu]);

  useEffect(() => {
    setUser({l1account, l2account});
    maybeShowOnboardingModal();
  }, []);

  const maybeShowOnboardingModal = () => {
    const onboardingTimestamp = getItem(localStorageOnboardingExpirationTimestampKey);
    const now = Date.now();
    const onboardingModalTimeoutMs = getMsFromHrs(onboardingModalTimeoutHrs);
    if (!onboardingTimestamp || onboardingTimestamp < now) {
      showOnboardingModal();
      setItem(localStorageOnboardingExpirationTimestampKey, now + onboardingModalTimeoutMs);
    }
  };

  const renderMenu = () => {
    switch (menu) {
      case MenuType.SELECT_TOKEN:
        return <SelectToken />;
      case MenuType.ACCOUNT:
        return <Account {...menuProps[MenuType.ACCOUNT]} />;
      case MenuType.TRANSFER:
      default:
        return <Transfer />;
    }
  };

  return (
    <div className={styles.bridge}>
      <BridgeProviders>
        <div className={styles.bridgeMenu}>
          <ToastProvider />
          {renderMenu()}
        </div>
      </BridgeProviders>
    </div>
  );
};
