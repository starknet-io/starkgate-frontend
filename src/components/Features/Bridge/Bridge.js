import React from 'react';

import {MenuType} from '../../../enums';
import {Account} from '../Account';
import {SelectToken} from '../SelectToken';
import {Transfer} from '../Transfer';
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

  return <div className={styles.bridge}>{renderMenu()}</div>;
};
