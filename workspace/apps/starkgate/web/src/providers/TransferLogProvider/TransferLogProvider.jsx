import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

import {
  GET_PENDING_WITHDRAWALS_ENDPOINT,
  GET_TRANSFERS_ENDPOINT,
  fetchL1Transfers,
  fetchL2Transfers,
  fetchPendingWithdrawals
} from '@api';
import {
  GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL,
  GET_TRANSFERS_REFETCH_INTERVAL
} from '@config/constants';
import {useL1Wallet, useL2Wallet} from '@providers';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import {TransferLogContext} from './transfer-log-context';

export const TransferLogProvider = ({children}) => {
  const {account: accountL1} = useL1Wallet();
  const {account: accountL2} = useL2Wallet();
  const [nextL1, setNextL1] = useState('');
  const [nextL2, setNextL2] = useState('');

  const pendingWithdrawalsQuery = useQuery({
    queryKey: [GET_PENDING_WITHDRAWALS_ENDPOINT, accountL1],
    queryFn: async () => {
      const {logs} = await fetchPendingWithdrawals(accountL1);
      return cloneLogsWithIds(logs);
    },
    enabled: !!accountL1,
    refetchInterval: GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL
  });

  const transfersQueryL1 = useInfiniteQuery({
    queryKey: [GET_TRANSFERS_ENDPOINT, accountL1],
    queryFn: async ({pageParam = ''}) => {
      const {logs, next} = await fetchL1Transfers(accountL1, pageParam);
      setNextL1(next);
      return cloneLogsWithIds(logs);
    },
    enabled: !!accountL1,
    getNextPageParam: () => nextL1,
    refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL
  });

  const transfersQueryL2 = useInfiniteQuery({
    queryKey: [GET_TRANSFERS_ENDPOINT, accountL2],
    queryFn: async ({pageParam = ''}) => {
      const {logs, next} = await fetchL2Transfers(accountL2, pageParam);
      setNextL2(next);
      return cloneLogsWithIds(logs);
    },
    enabled: !!accountL2,
    getNextPageParam: () => nextL2,
    refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL
  });

  const cloneLogsWithIds = useCallback(logs => logs.map(log => ({...log, id: log.l2TxHash})), []);

  const context = {
    transfersQueryL1,
    transfersQueryL2,
    pendingWithdrawalsQuery
  };

  return <TransferLogContext.Provider value={context}>{children}</TransferLogContext.Provider>;
};

TransferLogProvider.displayName = 'TransferLogProvider';

TransferLogProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
