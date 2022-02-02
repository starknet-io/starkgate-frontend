import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {MenuType} from '../../../enums';
import {selectBridge} from './Bridge.selectors';
import {showMenuAction} from './Bridge.slice';

export const useBridgeData = () => ({
  ...useSelector(selectBridge)
});

export const useBridgeActions = () => {
  return {
    showAccountMenu: useShowBridgeMenu(MenuType.ACCOUNT),
    showTransferMenu: useShowBridgeMenu(MenuType.TRANSFER),
    showSelectTokenMenu: useShowBridgeMenu(MenuType.SELECT_TOKEN)
  };
};

const useShowBridgeMenu = menu => {
  const dispatch = useDispatch();
  return useCallback(
    menuProps => {
      dispatch(showMenuAction({menu, menuProps}));
    },
    [dispatch]
  );
};
