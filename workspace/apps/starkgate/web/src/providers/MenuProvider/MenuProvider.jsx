import PropTypes from 'prop-types';
import React, {useReducer} from 'react';

import {MenuContext} from './menu-context';
import {actions, initialState, reducer} from './menu-reducer';

export const MenuProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showMenu = (menu, menuProps) => {
    dispatch({
      type: actions.SHOW_MENU,
      payload: {
        menu,
        menuProps
      }
    });
  };

  const resetMenuProps = () => {
    dispatch({
      type: actions.RESET_MENU_PROPS
    });
  };

  const value = {
    ...state,
    showMenu,
    resetMenuProps
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

MenuProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
