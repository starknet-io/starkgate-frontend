export const TransferStep = {
  APPROVE: 'Approve use funds',
  CONFIRM_TX: 'Confirm transaction',
  WAIT_FOR_TX: 'Waiting for the transaction to be received',
  INITIATE_WITHDRAW: 'Initiate transfer',
  WITHDRAW: 'Send L2 > L1 transfer',
  DEPOSIT: 'Send L1 > L2 transfer'
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
