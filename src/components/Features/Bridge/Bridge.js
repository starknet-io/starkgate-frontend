import React, {useEffect} from 'react';

import {Account, Faq, SelectToken, ToastProvider, Transfer} from '..';
import envs from '../../../config/envs';
import {MenuType} from '../../../enums';
import {useMenu} from '../../../providers/MenuProvider';
import {useOnboardingModal} from '../../../providers/ModalProvider';
import utils from '../../../utils';
import styles from './Bridge.module.scss';

const {localStorageOnboardingExpirationTimestampKey, onboardingModalTimeoutHrs} = envs;

export const Bridge = () => {
  const {menu, menuProps} = useMenu();
  const showOnboardingModal = useOnboardingModal();

  useEffect(() => {
    maybeShowOnboardingModal();
  }, []);

  const maybeShowOnboardingModal = () => {
    const onboardingTimestamp = utils.storage.getItem(localStorageOnboardingExpirationTimestampKey);
    const now = new Date().getTime();
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
