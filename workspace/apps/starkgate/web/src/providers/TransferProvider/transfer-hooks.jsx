import {useCallback, useContext, useMemo} from 'react';

import {useL1Token, useL2Token} from '@providers';
import {TransferType} from '@starkgate/shared';

import {TransferContext} from './transfer-context';

export const useTransfer = () => {
  return {
    ...useContext(TransferContext),
    setAmount: useSetAmount(),
    setTransferType: useSetTransferType(),
    selectToken: useSelectToken(),
    selectedToken: useSelectedToken(),
    setAutoWithdrawal: useSetAutoWithdrawal(),
    setFastWithdrawal: useSetFastWithdrawal()
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
  const tokenL1 = useL1Token()(symbol);
  const tokenL2 = useL2Token()(symbol);

  return useMemo(() => (isL1 ? tokenL1 : tokenL2), [symbol, isL1, tokenL1, tokenL2]);
};

export const useAmount = () => {
  const {amount} = useContext(TransferContext);
  const setAmount = useSetAmount();
  const clearAmount = () => setAmount('');

  return [amount, setAmount, clearAmount];
};

export const useIsL1 = () => {
  const {isL1} = useContext(TransferContext);
  const setTransferType = useSetTransferType();
  const swapToL1 = () => setTransferType(TransferType.DEPOSIT);

  return [isL1, swapToL1];
};

export const useIsL2 = () => {
  const {isL2} = useContext(TransferContext);
  const setTransferType = useSetTransferType();
  const swapToL2 = () => setTransferType(TransferType.WITHDRAWAL);

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

const useSetTransferType = () => {
  const {setTransferType} = useContext(TransferContext);

  return useCallback(
    TransferType => {
      setTransferType(TransferType);
    },
    [setTransferType]
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

const useSetAutoWithdrawal = () => {
  const {setAutoWithdrawal} = useContext(TransferContext);

  return useCallback(
    autoWithdrawal => {
      setAutoWithdrawal(autoWithdrawal);
    },
    [setAutoWithdrawal]
  );
};

const useSetFastWithdrawal = () => {
  const {setFastWithdrawal} = useContext(TransferContext);

  return useCallback(
    fastWithdrawal => {
      setFastWithdrawal(fastWithdrawal);
    },
    [setFastWithdrawal]
  );
};
