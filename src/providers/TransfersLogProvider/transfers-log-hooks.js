import {useContext, useMemo} from 'react';

import {TransfersLogContext} from './transfers-log-context';

export const useTransfersLog = () => useContext(TransfersLogContext);

export const useAccountTransfersLog = account => {
  const {transfers} = useTransfersLog();
  return useMemo(
    () => transfers.filter(tx => tx.sender === account || tx.recipient === account),
    [account, transfers]
  );
};
