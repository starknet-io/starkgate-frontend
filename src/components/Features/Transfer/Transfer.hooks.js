import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ActionType} from '../../../enums';
import {useEthereumToken, useStarknetToken} from '../../../providers/TokensProvider';
import {
  fromNetworkSelector,
  fromStarknetSelector,
  getCurrentAmountSelector,
  selectSymbol,
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

export const useTransferData = () => {
  return {
    ...useSelector(selectTransfer),
    selectedToken: useSelectedToken(),
    isEthereum: useSelector(toStarknetSelector),
    isStarknet: useSelector(fromStarknetSelector),
    fromNetwork: useSelector(fromNetworkSelector),
    toNetwork: useSelector(toNetworkSelector)
  };
};

export const useSelectedToken = () => {
  const symbol = useSelector(selectSymbol);
  const isEthereum = useSelector(toStarknetSelector);
  const getEthereumToken = useEthereumToken();
  const getStarknetToken = useStarknetToken();
  return useMemo(
    () => (isEthereum ? getEthereumToken(symbol) : getStarknetToken(symbol)),
    [symbol, isEthereum]
  );
};

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
