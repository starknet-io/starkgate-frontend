import React from 'react';

import {Account, SelectToken, TransactionToastManager, Transfer} from '..';
import {MenuType} from '../../../enums';
import {useBridgeData} from './Bridge.hooks';
import styles from './Bridge.module.scss';

export const Bridge = () => {
  const {menu} = useBridgeData();

  const renderMenu = () => {
    switch (menu) {
      case MenuType.TRANSFER:
        return <Transfer />;
      case MenuType.SELECT_TOKEN:
        return <SelectToken />;
      case MenuType.ACCOUNT:
        return <Account />;
    }
  };

  return (
    <div className={styles.bridge}>
      <TransactionToastManager />
      {renderMenu()}
    </div>
  );
};
