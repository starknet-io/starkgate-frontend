import {useMemo} from 'react';

import {TransferError} from '../enums';
import {evaluate} from '../utils';
import {useTransferProgressModalTranslation} from './useTranslation';

export const useTransferProgress = () => {
  const transferProgressStrings = useTransferProgressModalTranslation();

  return useMemo(
    () => ({
      approval: (symbol, activeStep) => {
        const {approval} = transferProgressStrings;
        const message = evaluate(approval.message, {symbol});
        return {
          type: approval.type,
          message,
          activeStep
        };
      },
      deposit: (amount, symbol, activeStep) => {
        const {deposit} = transferProgressStrings;
        const message = evaluate(deposit.message, {amount, symbol});
        return {
          type: deposit.type,
          message,
          activeStep
        };
      },
      initiateWithdraw: (amount, symbol, activeStep) => {
        const {initiateWithdraw} = transferProgressStrings;
        const message = evaluate(initiateWithdraw.message, {amount, symbol});
        return {
          type: initiateWithdraw.type,
          message,
          activeStep
        };
      },
      waitForConfirm: (walletName, activeStep) => {
        const {waitForConfirm} = transferProgressStrings;
        const type = evaluate(waitForConfirm.type, {walletName});
        const message = evaluate(waitForConfirm.message, {walletName});
        return {
          type,
          message,
          activeStep
        };
      },
      withdraw: (amount, symbol, activeStep) => {
        const {withdraw} = transferProgressStrings;
        const message = evaluate(withdraw.message, {amount, symbol});
        return {
          type: withdraw.type,
          message,
          activeStep
        };
      },
      error: (type, err) => {
        if (type === TransferError.MAX_TOTAL_BALANCE_ERROR) {
          const {limitation_error_title, max_total_balance_error_msg} = transferProgressStrings;
          return {
            type: limitation_error_title,
            message: max_total_balance_error_msg
          };
        }
        const {error_title} = transferProgressStrings;
        return {
          type: error_title,
          message: err.message
        };
      }
    }),
    [transferProgressStrings]
  );
};
