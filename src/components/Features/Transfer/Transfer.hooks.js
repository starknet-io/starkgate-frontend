import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ActionType} from '../../../enums';
import {useL1Token, useL2Token} from '../../../providers/TokensProvider';
import {
  fromNetworkSelector,
  toL1Selector,
  getCurrentAmountSelector,
  selectSymbol,
  selectTransfer,
  toNetworkSelector,
  toL2Selector
} from './Transfer.selectors';
import {resetAction, selectTokenAction, setAmountAction, setTransferAction} from './Transfer.slice';

export const useTransferActions = () => ({
  setAmount: useSetAmount(),
  setActionType: useSetActionType(),
  selectToken: useSelectToken(),
  resetTransfer: useResetTransfer()
});

export const useTransferData = () => {
  return {
    ...useSelector(selectTransfer),
    selectedToken: useSelectedToken(),
    isL1: useSelector(toL2Selector),
    isL2: useSelector(toL1Selector),
    fromNetwork: useSelector(fromNetworkSelector),
    toNetwork: useSelector(toNetworkSelector)
  };
};

export const useSelectedToken = () => {
  const symbol = useSelector(selectSymbol);
  const isL1 = useSelector(toL2Selector);
  const l1Token = useL1Token()(symbol);
  const l2Token = useL2Token()(symbol);
  return useMemo(() => (isL1 ? l1Token : l2Token), [symbol, isL1, l1Token, l2Token]);
};

export const useAmount = () => {
  const amount = useSelector(getCurrentAmountSelector);
  const setAmount = useSetAmount();
  const clearAmount = () => setAmount('');
  return [amount, setAmount, clearAmount];
};

export const useIsL1 = () => {
  const isL1 = useSelector(toL2Selector);
  const swapToL1 = useSetActionType(ActionType.TRANSFER_TO_L2);
  return [isL1, swapToL1];
};

export const useIsL2 = () => {
  const isL2 = useSelector(toL1Selector);
  const swapToL2 = useSetActionType(ActionType.TRANSFER_TO_L1);
  return [isL2, swapToL2];
};

const useSetAmount = () => {
  const dispatch = useDispatch();
  return useCallback(
    amount => {
      dispatch(setAmountAction(amount));
    },
    [dispatch]
  );
};

const useSetActionType = action => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(setTransferAction(action));
  }, [dispatch]);
};

const useSelectToken = () => {
  const dispatch = useDispatch();
  return useCallback(
    symbol => {
      dispatch(selectTokenAction(symbol));
    },
    [dispatch]
  );
};

const useResetTransfer = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(resetAction());
  }, [dispatch]);
};
