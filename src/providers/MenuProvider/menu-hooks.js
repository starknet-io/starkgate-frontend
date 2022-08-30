import {useCallback, useContext} from 'react';

import {MenuType} from '../../enums';
import {MenuContext} from './menu-context';

export const useMenu = () => {
  const {menu, menuProps, resetMenuProps} = useContext(MenuContext);

  return {
    menu,
    menuProps,
    showAccountMenu: useShowMenu(MenuType.ACCOUNT),
    showSourceMenu: useShowMenu(MenuType.SOURCE),
    showSelectTokenMenu: useShowMenu(MenuType.SELECT_TOKEN),
    resetMenuProps
  };
};

const useShowMenu = menu => {
  const {showMenu} = useContext(MenuContext);

  return useCallback(
    menuProps => {
      showMenu(menu, menuProps);
    },
    [showMenu]
  );
};
