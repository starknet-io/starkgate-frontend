import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {MenuType} from '../../../enums';
import {selectBridge} from './Bridge.selectors';
import {showMenuAction, resetMenuPropsAction} from './Bridge.slice';

export const useBridgeData = () => ({
  ...useSelector(selectBridge)
});

export const useBridgeActions = () => {
  return {
    showAccountMenu: useShowBridgeMenu(MenuType.ACCOUNT),
    showTransferMenu: useShowBridgeMenu(MenuType.TRANSFER),
    showSelectTokenMenu: useShowBridgeMenu(MenuType.SELECT_TOKEN),
    resetMenuProps: useResetMenuProps()
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

const useResetMenuProps = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(resetMenuPropsAction());
  }, [dispatch]);
};
