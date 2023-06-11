import React, {useEffect} from 'react';

import {setUser} from '@analytics';
import {MenuType} from '@enums';
import {Account, SelectToken, Source, ToastManager} from '@features';
import {useAccountChange, useIsMaxTotalBalanceExceeded, useMenuTracking} from '@hooks';
import {
  useBridgeIsFull,
  useL1Wallet,
  useL2Wallet,
  useLogin,
  useMenu,
  useSelectedToken
} from '@providers';

import styles from './Bridge.module.scss';

export const Bridge = () => {
  const trackMenu = useMenuTracking();
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
    async function maybeLockBridge() {
      const {exceeded} = await isMaxTotalBalanceExceeded();
      exceeded ? lockBridge() : unlockBridge();
    }

    isLoggedIn && maybeLockBridge();
  }, [isMaxTotalBalanceExceeded, selectedToken, isLoggedIn]);

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
