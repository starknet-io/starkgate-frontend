import {useMemo} from 'react';

import {evaluate, getString} from '../utils';

export const useTransferProgress = () => {
  const transferProgressStrings = getString('modals.transferProgress');
  return useMemo(
    () => ({
      approval: symbol => {
        const {approval} = transferProgressStrings;
        const message = evaluate(approval.message, {symbol});
        return {
          type: approval.type,
          message
        };
      },
      deposit: (amount, symbol) => {
        const {deposit} = transferProgressStrings;
        const message = evaluate(deposit.message, {amount, symbol});
        return {
          type: deposit.type,
          message
        };
      },
      initiateWithdraw: (amount, symbol) => {
        const {initiateWithdraw} = transferProgressStrings;
        const message = evaluate(initiateWithdraw.message, {amount, symbol});
        return {
          type: initiateWithdraw.type,
          message
        };
      },
      waitForConfirm: walletName => {
        const {waitForConfirm} = transferProgressStrings;
        const type = evaluate(waitForConfirm.type, {walletName});
        const message = evaluate(waitForConfirm.message, {walletName});
        return {
          type,
          message
        };
      },
      waitForAccept: () => {
        const {waitForAccept} = transferProgressStrings;
        return {
          type: waitForAccept.type,
          message: waitForAccept.message
        };
      },
      withdraw: (amount, symbol) => {
        const {withdraw} = transferProgressStrings;
        const message = evaluate(withdraw.message, {amount, symbol});
        return {
          type: withdraw.type,
          message
        };
      },
      error: err => {
        const {error_title} = transferProgressStrings;
        return {
          type: error_title,
          message: err.message
        };
      }
    }),
    []
  );
};
