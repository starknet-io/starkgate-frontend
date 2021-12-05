import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {MenuType} from '../../../enums';
import {selectBridge} from './Bridge.selectors';
import {showMenuAction} from './Bridge.slice';

export const useBridgeData = () => ({
  ...useSelector(selectBridge)
});

export const useBridgeActions = () => ({
  showAccountMenu: useShowBridgeMenu(MenuType.ACCOUNT),
  showTransferMenu: useShowBridgeMenu(MenuType.TRANSFER),
  showSelectTokenMenu: useShowBridgeMenu(MenuType.SELECT_TOKEN)
});

const useShowBridgeMenu = type => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(showMenuAction(type));
  }, [dispatch]);
};
