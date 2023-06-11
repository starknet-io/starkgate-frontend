import {MenuType} from '@enums';

export const actions = {
  SHOW_MENU: 'Menu/SHOW_MENU',
  RESET_MENU_PROPS: 'Menu/RESET_MENU_PROPS'
};

export const initialState = {
  menu: MenuType.SOURCE,
  menuProps: {
    [MenuType.ACCOUNT]: {transferId: null}
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SHOW_MENU: {
      const {menu, menuProps} = action.payload;

      return {
        menu,
        menuProps: {
          ...state.menuProps,
          [menu]: menuProps
        }
      };
    }

    case actions.RESET_MENU_PROPS: {
      return {
        ...state,
        menuProps: {
          ...state.menuProps,
          [state.menu]: initialState.menuProps[state.menu]
        }
      };
    }

    default:
      return state;
  }
};
