import React from 'react';

import {Account, Faq, SelectToken, ToastProvider, Transfer} from '..';
import {MenuType} from '../../../enums';
import {useMenu} from '../../../providers/MenuProvider';
import styles from './Bridge.module.scss';

export const Bridge = () => {
  const {menu, menuProps} = useMenu();

  const renderMenu = () => {
    switch (menu) {
      case MenuType.TRANSFER:
        return <Transfer />;
      case MenuType.SELECT_TOKEN:
        return <SelectToken />;
      case MenuType.ACCOUNT:
        return <Account {...menuProps[MenuType.ACCOUNT]} />;
      case MenuType.FAQ:
        return <Faq />;
    }
  };

  return (
    <div className={styles.bridge}>
      <ToastProvider />
      {renderMenu()}
    </div>
  );
};
