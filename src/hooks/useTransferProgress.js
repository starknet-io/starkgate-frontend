import {useMemo} from 'react';

import utils from '../utils';

export const useTransferProgress = () => {
  const transferProgressStrings = utils.getTranslation('modals.transferProgress');

  return useMemo(
    () => ({
      approval: symbol => {
        const {approval} = transferProgressStrings;
        const message = utils.object.evaluate(approval.message, {symbol});
        return {
          type: approval.type,
          message
        };
      },
      deposit: (amount, symbol) => {
        const {deposit} = transferProgressStrings;
        const message = utils.object.evaluate(deposit.message, {amount, symbol});
        return {
          type: deposit.type,
          message
        };
      },
      initiateWithdraw: (amount, symbol) => {
        const {initiateWithdraw} = transferProgressStrings;
        const message = utils.object.evaluate(initiateWithdraw.message, {amount, symbol});
        return {
          type: initiateWithdraw.type,
          message
        };
      },
      waitForConfirm: walletName => {
        const {waitForConfirm} = transferProgressStrings;
        const type = utils.object.evaluate(waitForConfirm.type, {walletName});
        const message = utils.object.evaluate(waitForConfirm.message, {walletName});
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
        const message = utils.object.evaluate(withdraw.message, {amount, symbol});
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
      },
      maxTotalBalanceError: () => {
        const {limitation_error_title, max_total_balance_error_msg} = transferProgressStrings;
        return {
          type: limitation_error_title,
          message: max_total_balance_error_msg
        };
      }
    }),
    []
  );
};
