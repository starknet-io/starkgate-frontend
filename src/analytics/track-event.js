export const TrackEvent = {
  /**
   * Menus
   */
  SELECT_TOKEN_MENU: 'SELECT_TOKEN_MENU',
  ACCOUNT_MENU: 'ACCOUNT_MENU',
  TRANSFER_MENU: 'TRANSFER_MENU',
  FAQ_MENU: 'FAQ_MENU',

  /**
   * Transfer menu
   */
  TRANSFER: {
    SWAP_NETWORK: 'TRANSFER_MENU/swap_network',
    MAX_CLICK: 'TRANSFER_MENU/max_click',
    TRANSFER_TO_L2_INITIATED: 'TRANSFER_MENU/transfer_to_l2_initiated',
    TRANSFER_TO_L2_SUCCESS: 'TRANSFER_MENU/transfer_to_l2_success',
    TRANSFER_TO_L2_REJECT: 'TRANSFER_MENU/transfer_to_l2_reject',
    TRANSFER_TO_L2_ERROR: 'TRANSFER_MENU/transfer_to_l2_error',
    TRANSFER_TO_L1_INITIATED: 'TRANSFER_MENU/transfer_to_l1_initiated',
    TRANSFER_TO_L1_SUCCESS: 'TRANSFER_MENU/transfer_to_l1_success',
    TRANSFER_TO_L1_REJECT: 'TRANSFER_MENU/transfer_to_l1_reject',
    TRANSFER_TO_L1_ERROR: 'TRANSFER_MENU/transfer_to_l1_error',
    COMPLETE_TRANSFER_TO_L1_INITIATED: 'TRANSFER_MENU/complete_transfer_to_l1_initiated',
    COMPLETE_TRANSFER_TO_L1_SUCCESS: 'TRANSFER_MENU/complete_transfer_to_l1_success',
    COMPLETE_TRANSFER_TO_L1_REJECT: 'TRANSFER_MENU/complete_transfer_to_l1_reject',
    COMPLETE_TRANSFER_TO_L1_ERROR: 'TRANSFER_MENU/complete_transfer_to_l1_error'
  },

  /**
   * Select token menu
   */
  SELECT_TOKEN: {
    TOKEN_SELECTED: 'SELECT_TOKEN_MENU/token_selected'
  },

  /**
   * Account menu
   */
  ACCOUNT: {
    TX_LINK_CLICK: 'ACCOUNT_MENU/tx_link_click',
    ACCOUNT_LINK_CLICK: 'ACCOUNT_MENU/account_link_click',
    VIEW_TRANSFERS_LOG: 'ACCOUNT_MENU/view_transfers_log',
    COMPLETE_TRANSFER_CLICK: 'ACCOUNT_MENU/complete_transfer',
    ADDRESS_COPIED: 'ACCOUNT_MENU/address_copied'
  },

  /**
   * Login screen
   */
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  LOGIN: {
    DOWNLOAD_CLICK: 'LOGIN_SCREEN/download_click',
    WALLET_CLICK: 'LOGIN_SCREEN/wallet_click',
    LOGIN_ERROR: 'LOGIN_SCREEN/login_error'
  },

  /**
   * Tabs
   */
  DISCORD_TAB_CLICK: 'discord_tab_click'
};
