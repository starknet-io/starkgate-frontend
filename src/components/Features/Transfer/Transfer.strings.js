import utils from '../../../utils';

export const INSUFFICIENT_BALANCE_ERROR_MSG = utils.getTranslation(
  'menus.transfer.insufficient_balance_error_msg'
);

export const MAX_DEPOSIT_ERROR_MSG = (maxDeposit, symbol) =>
  utils.object.evaluate(utils.getTranslation('menus.transfer.max_deposit_error_msg'), {
    maxDeposit,
    symbol
  });
