import React, {useEffect} from 'react';

import {setUser} from '@analytics';
import {MenuType} from '@enums';
import {Account, SelectToken, Source, ToastManager} from '@features';
import {
  useAccountChange,
  useEnvs,
  useHeadTranslation,
  useIsMaxTotalBalanceExceeded,
  useMenuTracking,
  useTitle
} from '@hooks';
import {useBridgeIsFull, useMenu, useSelectedToken, useWalletLogin, useWallets} from '@providers';

import styles from './Bridge.module.scss';

export const Bridge = () => {
  const trackMenu = useMenuTracking();
  const {menu, menuProps} = useMenu();
  const {ethereumAccount, starknetAccount} = useWallets();
  const {isConnected} = useWalletLogin();
  const {lockBridge, unlockBridge} = useBridgeIsFull();
  const selectedToken = useSelectedToken();
  const isMaxTotalBalanceExceeded = useIsMaxTotalBalanceExceeded();
  const titles = useHeadTranslation('title.bridge');

  const {CHAIN} = useEnvs();
  useTitle(titles[CHAIN]);

  useAccountChange(accountHash => {
    accountHash && setUser({ethereumAccount, starknetAccount});
  }, []);

  useEffect(() => {
    trackMenu(menu);
  }, [menu]);

  useEffect(() => {
    async function maybeLockBridge() {
      const {exceeded} = await isMaxTotalBalanceExceeded();
      exceeded ? lockBridge() : unlockBridge();
    }

    isConnected && maybeLockBridge();
  }, [isMaxTotalBalanceExceeded, selectedToken, isConnected]);

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
