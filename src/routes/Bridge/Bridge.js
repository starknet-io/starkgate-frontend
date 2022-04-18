import React, {useEffect} from 'react';

import {setUser} from '../../analytics';
import {Account, SelectToken, ToastProvider, Transfer} from '../../components/Features';
import {MenuType} from '../../enums';
import {useEnvs, useMenuTracking} from '../../hooks';
import {EventManagerProvider} from '../../providers/EventManagerProvider';
import {useMenu} from '../../providers/MenuProvider';
import {useOnboardingModal} from '../../providers/ModalProvider';
import {TokensProvider} from '../../providers/TokensProvider';
import {useL1Wallet, useL2Wallet} from '../../providers/WalletsProvider';
import utils from '../../utils';
import styles from './Bridge.module.scss';

export const Bridge = () => {
  const {localStorageOnboardingExpirationTimestampKey, onboardingModalTimeoutHrs} = useEnvs();
  const [trackAccountMenu, trackTransferMenu, trackSelectTokenMenu] = useMenuTracking();
  const {menu, menuProps} = useMenu();
  const {account: l1account} = useL1Wallet();
  const {account: l2account} = useL2Wallet();
  const showOnboardingModal = useOnboardingModal();

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
        trackSelectTokenMenu();
        return <SelectToken />;
      case MenuType.ACCOUNT:
        trackAccountMenu();
        return <Account {...menuProps[MenuType.ACCOUNT]} />;
      case MenuType.TRANSFER:
      default:
        trackTransferMenu();
        return <Transfer />;
    }
  };

  return (
    <div className={styles.bridge}>
      <TokensProvider>
        <EventManagerProvider>
          <div className={styles.bridgeMenu}>
            <ToastProvider />
            {renderMenu()}
          </div>
        </EventManagerProvider>
      </TokensProvider>
    </div>
  );
};
