import {TransactionStatus, isOnChain} from '@starkware-webapps/enums';

export enum TransferType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL'
}

export type EthereumAddress = string;
export type StarknetAddress = string;

export type Hash = string;

export enum DepositTransferStatus {
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED'
}

export enum WithdrawalTransferStatus {
  INITIATED = 'INITIATED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

export type TransferLog = {
  type: TransferType;
  status: DepositTransferStatus | WithdrawalTransferStatus;
  symbol: string;
  name: string;
  amount: string;
  fullAmount: string;
  l1Address: EthereumAddress;
  l1TxHash: Hash;
  l1TxTimestamp: number;
  l2Address: StarknetAddress;
  l2TxHash: Hash;
  l2TxStatus: TransactionStatus;
  l2TxTimestamp: number;
  fastWithdrawal?: boolean;
  autoWithdrawal?: boolean;
  customData?: object;
};

export const isDeposit = (type: TransferType) => type === TransferType.DEPOSIT;
export const isWithdrawal = (type: TransferType) => type === TransferType.WITHDRAWAL;
export const isPendingWithdrawal = ({
  type,
  l1TxHash,
  l2TxStatus,
  fastWithdrawal,
  autoWithdrawal,
  customData
}: TransferLog) => {
  return (
    isWithdrawal(type) &&
    !autoWithdrawal &&
    !l1TxHash &&
    ((!fastWithdrawal && isOnChain(l2TxStatus)) || (fastWithdrawal && customData))
  );
};
