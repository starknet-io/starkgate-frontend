import React, {useEffect} from 'react';

import {Account, FAQ, SelectToken, ToastProvider, Transfer} from '..';
import envs from '../../../config/envs';
import {MenuType} from '../../../enums';
import {useMenu} from '../../../providers/MenuProvider';
import {useOnboardingModal} from '../../../providers/ModalProvider';
import utils from '../../../utils';
import styles from './Bridge.module.scss';

const {localStorageOnboardingTimestampKey, onboardingModalTimeoutHr} = envs;

export const Bridge = () => {
  const {menu, menuProps} = useMenu();
  const showOnboardingModal = useOnboardingModal();

  useEffect(() => {
    maybeShowOnboardingModal();
  }, []);

  const maybeShowOnboardingModal = () => {
    const onboardingTimestamp = utils.storage.getItem(localStorageOnboardingTimestampKey);
    const currentTime = new Date().getTime();
    const timeout = utils.date.getMsFromHs(onboardingModalTimeoutHr);
    if (!onboardingTimestamp || Number.parseInt(onboardingTimestamp, 10) < currentTime) {
      showOnboardingModal();
      utils.storage.setItem(localStorageOnboardingTimestampKey, currentTime + timeout);
    }
  };

  const renderMenu = () => {
    switch (menu) {
      case MenuType.TRANSFER:
        return <Transfer />;
      case MenuType.SELECT_TOKEN:
        return <SelectToken />;
      case MenuType.ACCOUNT:
        return <Account {...menuProps[MenuType.ACCOUNT]} />;
      case MenuType.FAQ:
        return <FAQ />;
    }
  };

  return (
    <div className={styles.bridge}>
      <ToastProvider />
      {renderMenu()}
    </div>
  );
};
