import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ActionType} from '../../../../enums';
import {
  fromNetworkSelector,
  fromStarknetSelector,
  getCurrentAmountSelector,
  getCurrentSelectedTokenSelector,
  selectTransfer,
  toNetworkSelector,
  toStarknetSelector
} from './Transfer.selectors';
import {resetAction, selectTokenAction, setAmountAction, setTransferAction} from './Transfer.slice';

export const useTransferActions = () => ({
  setAmount: useSetAmount(),
  setActionType: useSetActionType(),
  selectToken: useSelectToken(),
  resetTransfer: useResetTransfer()
});

export const useTransferData = () => ({
  ...useSelector(selectTransfer),
  selectedToken: useSelector(getCurrentSelectedTokenSelector),
  isEthereum: useSelector(toStarknetSelector),
  isStarknet: useSelector(fromStarknetSelector),
  fromNetwork: useSelector(fromNetworkSelector),
  toNetwork: useSelector(toNetworkSelector)
});

export const useAmount = () => {
  const amount = useSelector(getCurrentAmountSelector);
  const setAmount = useSetAmount();
  const clearAmount = () => setAmount('');
  return [amount, setAmount, clearAmount];
};

export const useIsEthereum = () => {
  const isEthereum = useSelector(toStarknetSelector);
  const setEthereum = useSetActionType(ActionType.TRANSFER_TO_STARKNET);
  return [isEthereum, setEthereum];
};

export const useIsStarknet = () => {
  const isStarknet = useSelector(fromStarknetSelector);
  const setStarknet = useSetActionType(ActionType.TRANSFER_FROM_STARKNET);
  return [isStarknet, setStarknet];
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
    token => {
      dispatch(selectTokenAction(token));
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
