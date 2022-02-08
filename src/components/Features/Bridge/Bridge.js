import React from 'react';

import {Account, SelectToken, ToastProvider, Transfer} from '..';
import {MenuType} from '../../../enums';
import {useBridgeData} from './Bridge.hooks';
import styles from './Bridge.module.scss';

export const Bridge = () => {
  const {menu, menuProps} = useBridgeData();

  const renderMenu = () => {
    switch (menu) {
      case MenuType.TRANSFER:
        return <Transfer />;
      case MenuType.SELECT_TOKEN:
        return <SelectToken />;
      case MenuType.ACCOUNT:
        return <Account {...menuProps[MenuType.ACCOUNT]} />;
    }
  };

  return (
    <div className={styles.bridge}>
      <ToastProvider />
      {renderMenu()}
    </div>
  );
};
