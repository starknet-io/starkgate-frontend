export enum TransactionStatus {
  REJECTED = 'REJECTED',
  NOT_RECEIVED = 'NOT_RECEIVED',
  RECEIVED = 'RECEIVED',
  PENDING = 'PENDING',
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1'
}

export const TransactionStatusFriendlyMessage: {
  [status in TransactionStatus]: string;
} = {
  [TransactionStatus.REJECTED]: 'Invalid transaction',
  [TransactionStatus.NOT_RECEIVED]: 'Waiting to be accepted on L2',
  [TransactionStatus.RECEIVED]: 'Waiting to be accepted on L2',
  [TransactionStatus.PENDING]: 'Accepted on L2',
  [TransactionStatus.ACCEPTED_ON_L2]: 'Accepted on L2',
  [TransactionStatus.ACCEPTED_ON_L1]: 'Proved and accepted on L1'
};

export const TransactionPendingStatuses: Array<TransactionStatus> = [
  TransactionStatus.NOT_RECEIVED,
  TransactionStatus.RECEIVED
];

export const TransactionCompletedStatuses: Array<TransactionStatus> = [
  TransactionStatus.REJECTED,
  TransactionStatus.ACCEPTED_ON_L1
];

export const TransactionConsumedStatuses: Array<TransactionStatus> = [
  TransactionStatus.ACCEPTED_ON_L2,
  TransactionStatus.PENDING
];

export enum TransactionStatusStep {
  NOT_RECEIVED = 0,
  RECEIVED,
  PENDING,
  ACCEPTED_ON_L2,
  ACCEPTED_ON_L1,
  REJECTED
}

export const isPending = (status: TransactionStatus): boolean =>
  TransactionPendingStatuses.includes(status);

export const isConsumed = (status: TransactionStatus): boolean =>
  TransactionConsumedStatuses.includes(status);

export const isCompleted = (status: TransactionStatus): boolean =>
  TransactionCompletedStatuses.includes(status);

export const isRejected = (status: TransactionStatus): boolean =>
  status === TransactionStatus.REJECTED;

export const isOnChain = (status: TransactionStatus): boolean =>
  status === TransactionStatus.ACCEPTED_ON_L1;
