import React, {useEffect} from 'react';

import {Account, Faq, SelectToken, ToastProvider, Transfer} from '..';
import {setUser, track, TrackEvent} from '../../../analytics';
import envs from '../../../config/envs';
import {MenuType} from '../../../enums';
import {useMenu} from '../../../providers/MenuProvider';
import {useOnboardingModal} from '../../../providers/ModalProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import utils from '../../../utils';
import styles from './Bridge.module.scss';

const {localStorageOnboardingExpirationTimestampKey, onboardingModalTimeoutHrs} = envs;

export const Bridge = () => {
  const {menu, menuProps} = useMenu();
  const {account: l1account} = useL1Wallet();
  const {account: l2account} = useL2Wallet();
  const showOnboardingModal = useOnboardingModal();

  useEffect(() => {
    setUser({l1account, l2account});
    maybeShowOnboardingModal();
  }, []);

  useEffect(() => {
    track(TrackEvent[`${menu}_MENU`]);
  }, [menu]);

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
      case MenuType.FAQ:
        return <Faq />;
      case MenuType.TRANSFER:
      default:
        return <Transfer />;
    }
  };

  return (
    <div className={styles.bridge}>
      <ToastProvider />
      {renderMenu()}
    </div>
  );
};
