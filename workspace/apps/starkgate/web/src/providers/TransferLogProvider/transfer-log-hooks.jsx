import {useContext, useMemo} from 'react';

import {useTransfer, useWallets} from '@providers';
import {isDeposit} from '@starkgate/shared';

import {TransferLogContext} from './transfer-log-context';

export const useTransferLog = () => {
  const {isL1} = useTransfer();
  const {transfersQueryL1, transfersQueryL2} = useContext(TransferLogContext);
  const query = isL1 ? transfersQueryL1 : transfersQueryL2;

  return useMemo(
    () => ({
      ...query,
      transfers: flattenPages(query?.data)
    }),
    [query]
  );
};

export const useTransfers = () => {
  const {
    transfersQueryL1: {data: transfersL1, isFetching: isFetchingL1},
    transfersQueryL2: {data: transfersL2, isFetching: isFetchingL2},
    pendingWithdrawalsQuery: {data: withdrawals, isFetching: isFetchingWithdrawals}
  } = useContext(TransferLogContext);

  const {ethereumAccount, starknetAccount} = useWallets();

  const doneFetching = !!(
    !isFetchingL1 &&
    !isFetchingL2 &&
    !isFetchingWithdrawals &&
    (transfersL1 || !ethereumAccount) &&
    (transfersL2 || !starknetAccount) &&
    (withdrawals || !ethereumAccount)
  );

  return useMemo(() => {
    const removeDuplicatesLogs = logs => {
      const unique = {};
      return logs.filter(log => !unique[log.id] && (unique[log.id] = true));
    };

    const sortLogsAccordingToTimestamp = logs => {
      const extractTs = ({type, l1TxTimestamp, l2TxTimestamp}) => {
        return isDeposit(type) ? l1TxTimestamp : l2TxTimestamp;
      };
      return logs.sort((a, b) => extractTs(a) - extractTs(b));
    };

    if (doneFetching) {
      const uniqueLogs = removeDuplicatesLogs([
        ...(withdrawals || []),
        ...flattenPages(transfersL1),
        ...flattenPages(transfersL2)
      ]);
      return sortLogsAccordingToTimestamp(uniqueLogs);
    }
    return [];
  }, [doneFetching]);
};

const flattenPages = data => data?.pages?.reduce((prev, curr) => [...prev, ...curr], []) || [];
