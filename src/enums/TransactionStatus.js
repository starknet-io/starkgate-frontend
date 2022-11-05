export const TransactionStatus = {
  REJECTED: 'REJECTED',
  NOT_RECEIVED: 'NOT_RECEIVED',
  RECEIVED: 'RECEIVED',
  PENDING: 'PENDING',
  ACCEPTED_ON_L2: 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1: 'ACCEPTED_ON_L1'
};

export const TransactionStatusFriendlyMessage = {
  [TransactionStatus.REJECTED]: 'Invalid transaction',
  [TransactionStatus.NOT_RECEIVED]: 'Waiting to be accepted on L2',
  [TransactionStatus.RECEIVED]: 'Waiting to be accepted on L2',
  [TransactionStatus.PENDING]: 'Accepted on L2',
  [TransactionStatus.ACCEPTED_ON_L2]: 'Accepted on L2',
  [TransactionStatus.ACCEPTED_ON_L1]: 'Proved and accepted on L1'
};

export const TransactionPendingStatuses = [
  TransactionStatus.NOT_RECEIVED,
  TransactionStatus.RECEIVED
];

export const TransactionCompletedStatuses = [
  TransactionStatus.REJECTED,
  TransactionStatus.ACCEPTED_ON_L1
];

export const TransactionConsumedStatuses = [
  TransactionStatus.ACCEPTED_ON_L2,
  TransactionStatus.PENDING
];

export const TransactionStatusStep = {
  NOT_RECEIVED: 0,
  RECEIVED: 1,
  PENDING: 2,
  ACCEPTED_ON_L2: 3,
  ACCEPTED_ON_L1: 4,
  REJECTED: 5
};

export const isPending = status => TransactionPendingStatuses.includes(status);

export const isConsumed = status => TransactionConsumedStatuses.includes(status);

export const isCompleted = status => TransactionCompletedStatuses.includes(status);

export const isRejected = status => status === TransactionStatus.REJECTED;

export const isOnChain = status => status === TransactionStatus.ACCEPTED_ON_L1;
