import React, {useEffect} from 'react';

import {setUser} from '../../analytics';
import {Account, SelectToken, ToastProvider, Transfer} from '../../components/Features';
import {MenuType} from '../../enums';
import {useEnvs, useMenuTracking} from '../../hooks';
import {BridgeProviders} from '../../providers';
import {useMenu} from '../../providers/MenuProvider';
import {useOnboardingModal} from '../../providers/ModalProvider';
import {useL1Wallet, useL2Wallet} from '../../providers/WalletsProvider';
import utils from '../../utils';
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
    const onboardingTimestamp = utils.storage.getItem(localStorageOnboardingExpirationTimestampKey);
    const now = Date.now();
    const onboardingModalTimeoutMs = utils.date.getMsFromHrs(onboardingModalTimeoutHrs);
    if (!onboardingTimestamp || onboardingTimestamp < now) {
      showOnboardingModal();
      utils.storage.setItem(
        localStorageOnboardingExpirationTimestampKey,
        now + onboardingModalTimeoutMs
      );
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
