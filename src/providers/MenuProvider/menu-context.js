import {createContext} from 'react';

import {initialState} from './menu-reducer';

export const MenuContext = createContext({
  ...initialState,
  showMenu: (menu, menuProps) => ({menu, menuProps}),
  resetMenuProps: () => {}
});
