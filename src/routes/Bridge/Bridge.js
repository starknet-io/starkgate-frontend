import {getCookie, setCookie} from '@starkware-industries/commons-js-utils';
import React, {useEffect} from 'react';

import {setUser} from '../../analytics';
import {Account, SelectToken, Source, ToastManager} from '../../components/Features';
import {HIDE_ELEMENT_COOKIE_DURATION_DAYS, ONBOARDING_COOKIE_NAME} from '../../config/constants';
import {MenuType} from '../../enums';
import {useAccountChange, useIsMaxTotalBalanceExceeded, useMenuTracking} from '../../hooks';
import {useLogin} from '../../providers/AppProvider';
import {useMenu} from '../../providers/MenuProvider';
import {useOnboardingModal} from '../../providers/ModalProvider';
import {useBridgeIsFull, useSelectedToken} from '../../providers/TransferProvider';
import {useL1Wallet, useL2Wallet} from '../../providers/WalletsProvider';
import styles from './Bridge.module.scss';

export const Bridge = () => {
  const trackMenu = useMenuTracking();
  const showOnboardingModal = useOnboardingModal();
  const {menu, menuProps} = useMenu();
  const {account: accountL1} = useL1Wallet();
  const {account: accountL2} = useL2Wallet();
  const {lockBridge, unlockBridge} = useBridgeIsFull();
  const selectedToken = useSelectedToken();
  const isMaxTotalBalanceExceeded = useIsMaxTotalBalanceExceeded();
  const {isLoggedIn} = useLogin();
  useAccountChange(accountHash => {
    accountHash && setUser({accountL1, accountL2});
  }, []);

  useEffect(() => {
    trackMenu(menu);
  }, [menu]);

  useEffect(() => {
    maybeShowOnboardingModal();
  }, []);

  useEffect(() => {
    async function maybeLockBridge() {
      const {exceeded} = await isMaxTotalBalanceExceeded();
      exceeded ? lockBridge() : unlockBridge();
    }

    isLoggedIn && maybeLockBridge();
  }, [isMaxTotalBalanceExceeded, selectedToken, isLoggedIn]);

  const maybeShowOnboardingModal = () => {
    const onboardingCookie = getCookie(ONBOARDING_COOKIE_NAME);
    if (!onboardingCookie) {
      showOnboardingModal();
      setCookie(ONBOARDING_COOKIE_NAME, true, HIDE_ELEMENT_COOKIE_DURATION_DAYS);
    }
  };

  const renderMenu = () => {
    switch (menu) {
      case MenuType.SELECT_TOKEN:
        return <SelectToken />;
      case MenuType.ACCOUNT:
        return <Account {...menuProps[MenuType.ACCOUNT]} />;
      case MenuType.SOURCE:
      default:
        return <Source />;
    }
  };

  return (
    <div className={styles.bridge}>
      <div className={styles.bridgeMenu}>
        <ToastManager />
        {renderMenu()}
      </div>
    </div>
  );
};
