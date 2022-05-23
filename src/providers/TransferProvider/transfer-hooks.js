import {useCallback, useContext, useMemo} from 'react';

import {ActionType} from '../../enums';
import {useL1Token, useL2Token} from '../TokensProvider';
import {TransferContext} from './transfer-context';

export const useTransfer = () => {
  return {
    ...useContext(TransferContext),
    setAmount: useSetAmount(),
    setActionType: useSetActionType(),
    selectToken: useSelectToken(),
    selectedToken: useSelectedToken()
  };
};

export const useBridgeIsFull = () => {
  const {setBridgeIsFull, bridgeIsFull} = useContext(TransferContext);

  const lockBridge = useCallback(() => {
    setBridgeIsFull(true);
  }, []);

  const unlockBridge = useCallback(() => {
    setBridgeIsFull(false);
  }, []);

  return {
    bridgeIsFull,
    lockBridge,
    unlockBridge
  };
};

export const useSelectedToken = () => {
  const {symbol, isL1} = useContext(TransferContext);
  const l1Token = useL1Token()(symbol);
  const l2Token = useL2Token()(symbol);

  return useMemo(() => (isL1 ? l1Token : l2Token), [symbol, isL1, l1Token, l2Token]);
};

export const useAmount = () => {
  const {amount} = useContext(TransferContext);
  const setAmount = useSetAmount();
  const clearAmount = () => setAmount('');

  return [amount, setAmount, clearAmount];
};

export const useIsL1 = () => {
  const {isL1} = useContext(TransferContext);
  const setActionType = useSetActionType();
  const swapToL1 = () => setActionType(ActionType.TRANSFER_TO_L2);

  return [isL1, swapToL1];
};

export const useIsL2 = () => {
  const {isL2} = useContext(TransferContext);
  const setActionType = useSetActionType();
  const swapToL2 = () => setActionType(ActionType.TRANSFER_TO_L1);

  return [isL2, swapToL2];
};

const useSetAmount = () => {
  const {setAmount} = useContext(TransferContext);

  return useCallback(
    amount => {
      setAmount(amount);
    },
    [setAmount]
  );
};

const useSetActionType = () => {
  const {setActionType} = useContext(TransferContext);

  return useCallback(
    actionType => {
      setActionType(actionType);
    },
    [setActionType]
  );
};

const useSelectToken = () => {
  const {selectToken} = useContext(TransferContext);

  return useCallback(
    symbol => {
      selectToken(symbol);
    },
    [selectToken]
  );
};
