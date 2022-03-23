import {useContext, useMemo} from 'react';

import {TransfersContext} from './transfers-context';

export const useTransfers = () => useContext(TransfersContext);

export const useAccountTransfers = account => {
  const {transfers} = useTransfers();

  return useMemo(
    () => transfers.filter(tx => tx.sender === account || tx.recipient === account),
    [account, transfers]
  );
};
