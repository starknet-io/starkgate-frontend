import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

import {
  GET_PENDING_WITHDRAWALS_ENDPOINT,
  GET_TRANSFERS_ENDPOINT,
  fetchL1Transfers,
  fetchL2Transfers,
  fetchPendingWithdrawals
} from '@api';
import {useConstants} from '@hooks';
import {TransferLogContext, useWallets} from '@providers';
import {TransferType} from '@starkgate/shared';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

const TOO_MANY_REQUESTS = 429;

export const TransferLogProvider = ({children}) => {
  const {ethereumAccount, starknetAccount} = useWallets();
  const [nextL1, setNextL1] = useState('');
  const [nextL2, setNextL2] = useState('');
  const {
    GET_TRANSFERS_MAX_RETRY,
    GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL,
    GET_TRANSFERS_REFETCH_INTERVAL
  } = useConstants();

  const retryFunc = useCallback(
    (failureCount, error) =>
      error.code !== TOO_MANY_REQUESTS && failureCount < GET_TRANSFERS_MAX_RETRY,
    []
  );

  const pendingWithdrawalsQuery = useQuery({
    queryKey: [GET_PENDING_WITHDRAWALS_ENDPOINT, ethereumAccount],
    queryFn: async () => {
      const {logs} = await fetchPendingWithdrawals(ethereumAccount);
      return cloneLogsWithIds(logs);
    },
    enabled: !!ethereumAccount,
    refetchInterval: GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    retry: retryFunc
  });

  const transfersQueryL1 = useInfiniteQuery({
    queryKey: [GET_TRANSFERS_ENDPOINT, ethereumAccount],
    queryFn: async ({pageParam = ''}) => {
      const {logs, next} = await fetchL1Transfers(ethereumAccount, pageParam);
      setNextL1(next);
      return cloneLogsWithIds(logs);
    },
    enabled: !!ethereumAccount,
    getNextPageParam: () => nextL1,
    refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    retry: retryFunc
  });

  const transfersQueryL2 = useInfiniteQuery({
    queryKey: [GET_TRANSFERS_ENDPOINT, starknetAccount],
    queryFn: async ({pageParam = ''}) => {
      const {logs, next} = await fetchL2Transfers(starknetAccount, pageParam);
      setNextL2(next);
      return cloneLogsWithIds(logs);
    },
    enabled: !!starknetAccount,
    getNextPageParam: () => nextL2,
    refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    retry: retryFunc
  });

  const cloneLogsWithIds = useCallback(
    logs =>
      logs.map(log => ({
        ...log,
        id: log.type === TransferType.DEPOSIT ? log.l1TxHash : log.l2TxHash
      })),
    []
  );

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
