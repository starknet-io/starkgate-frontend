export const TransferStep = {
  APPROVE: 'Approve use funds',
  CONFIRM_TX: 'Confirm transaction',
  WAIT_FOR_TX: 'Wait for transaction to received',
  INITIATE_WITHDRAW: 'Initiate withdraw',
  WITHDRAW: 'Send withdraw',
  DEPOSIT: 'Send deposit'
};

export const TransferToL2Steps = [
  TransferStep.APPROVE,
  TransferStep.CONFIRM_TX,
  TransferStep.DEPOSIT
];

export const TransferToL1Steps = [
  TransferStep.CONFIRM_TX,
  TransferStep.INITIATE_WITHDRAW,
  TransferStep.WAIT_FOR_TX
];

export const CompleteTransferToL1Steps = [TransferStep.CONFIRM_TX, TransferStep.WITHDRAW];

export const stepOf = (step, steps) => {
  return steps.indexOf(step);
};
