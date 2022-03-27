import utils from '../../../utils';

export const INSUFFICIENT_BALANCE_ERROR_MSG = utils.getTranslation(
  'menus.transfer.insufficient_balance_error_msg'
);

export const MAX_AMOUNT_ERROR_MSG = (maxAmount, symbol) =>
  utils.object.evaluate(utils.getTranslation('menus.transfer.max_amount_error_msg'), {
    maxAmount,
    symbol
  });

export const MAX_TOTAL_BALANCE = utils.getTranslation('menus.transfer.max_total_balance_error_msg');
