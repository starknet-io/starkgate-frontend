export const TransactionStatus = {
  REJECTED: 'REJECTED',
  NOT_RECEIVED: 'NOT_RECEIVED',
  RECEIVED: 'RECEIVED',
  PENDING: 'PENDING',
  ACCEPTED_ON_L2: 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1: 'ACCEPTED_ON_L1'
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
