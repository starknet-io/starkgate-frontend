export const TrackEvent = {
  /**
   * Menus
   */
  SELECT_TOKEN_MENU: 'SELECT_TOKEN_MENU',
  ACCOUNT_MENU: 'ACCOUNT_MENU',
  TRANSFER_MENU: 'TRANSFER_MENU',
  FAQ_MENU: 'FAQ_MENU',

  /**
   * Tabs
   */
  DISCORD_TAB_CLICK: 'discord_tab_click',

  /**
   * Transfer menu
   */
  TRANSFER: {
    SWAP_NETWORK: 'TRANSFER/swap_network',
    MAX_CLICK: 'TRANSFER/max_click',
    TRANSFER_TO_L2: 'TRANSFER/deposit',
    TRANSFER_TO_L2_SUCCESS: 'TRANSFER/deposit_success',
    TRANSFER_TO_L2_REJECT: 'TRANSFER/deposit_reject',
    TRANSFER_TO_L2_ERROR: 'TRANSFER/deposit_error',
    TRANSFER_TO_L1: 'TRANSFER/initiate_withdraw',
    TRANSFER_TO_L1_SUCCESS: 'TRANSFER/initiate_withdraw_success',
    TRANSFER_TO_L1_REJECT: 'TRANSFER/initiate_withdraw_reject',
    TRANSFER_TO_L1_ERROR: 'TRANSFER/initiate_withdraw_error',
    COMPLETE_TRANSFER_TO_L1: 'TRANSFER/withdraw',
    COMPLETE_TRANSFER_TO_L1_SUCCESS: 'TRANSFER/withdraw_success',
    COMPLETE_TRANSFER_TO_L1_REJECT: 'TRANSFER/withdraw_reject',
    COMPLETE_TRANSFER_TO_L1_ERROR: 'TRANSFER/withdraw_error'
  },

  /**
   * Select token menu
   */
  SELECT_TOKEN: {
    TOKEN_SELECTED: 'SELECT_TOKEN/token_selected'
  },

  /**
   * Account menu
   */
  ACCOUNT: {
    TX_LINK_CLICK: 'ACCOUNT/tx_link_click',
    ACCOUNT_LINK_CLICK: 'ACCOUNT/account_link_click',
    VIEW_TRANSFERS_LOG: 'ACCOUNT/view_transfers_log',
    COMPLETE_TRANSFER: 'ACCOUNT/complete_transfer',
    ADDRESS_COPIED: 'ACCOUNT/address_copied'
  }
};
