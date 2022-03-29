import React, {useEffect} from 'react';

import {Account, Faq, SelectToken, ToastProvider, Transfer} from '..';
import {MenuType} from '../../../enums';
import {useMenu} from '../../../providers/MenuProvider';
import {useL1Wallet, useL2Wallet} from '../../../providers/WalletsProvider';
import {setUser, track, TrackEvent} from '../../../tracking';
import styles from './Bridge.module.scss';

export const Bridge = () => {
  const {menu, menuProps} = useMenu();
  const {account: l1account} = useL1Wallet();
  const {account: l2account} = useL2Wallet();

  useEffect(() => {
    setUser({l1account, l2account});
  }, []);

  useEffect(() => {
    track(TrackEvent[`${menu}_MENU`]);
  }, [menu]);

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
