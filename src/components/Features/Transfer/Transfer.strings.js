import {evaluate, getTranslation} from '../../../utils';

export const INSUFFICIENT_BALANCE_ERROR_MSG = getTranslation(
  'menus.transfer.insufficient_balance_error_msg'
);

export const MAX_AMOUNT_ERROR_MSG = (maxAmount, symbol) =>
  evaluate(getTranslation('menus.transfer.max_amount_error_msg'), {maxAmount, symbol});
