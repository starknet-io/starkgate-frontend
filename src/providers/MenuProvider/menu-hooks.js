import {useCallback, useContext} from 'react';

import {MenuType} from '../../enums';
import {MenuContext} from './menu-context';

export const useMenu = () => {
  const {menu, menuProps, resetMenuProps} = useContext(MenuContext);

  return {
    menu,
    menuProps,
    showFaqMenu: useShowMenu(MenuType.FAQ),
    showTermsMenu: useShowMenu(MenuType.TERMS),
    showAccountMenu: useShowMenu(MenuType.ACCOUNT),
    showTransferMenu: useShowMenu(MenuType.TRANSFER),
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
