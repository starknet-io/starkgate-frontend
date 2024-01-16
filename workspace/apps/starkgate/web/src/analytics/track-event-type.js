export const TrackEventType = {
  /**
   * Menus
   */
  SELECT_TOKEN_MENU: 'select_token_menu',
  ACCOUNT_MENU: 'account_menu',
  TRANSFER_MENU: 'transfer_menu',

  /**
   * Connect buttons
   */
  CONNECT_ETHEREUM_WALLET_CLICK: 'connect_ethereum_wallet_click',
  CONNECT_STARKNET_WALLET_CLICK: 'connect_starknet_wallet_click',
  CONNECT_WALLET_CLICK: 'connect_wallet_click',

  /**
   * Transfer menu
   */
  TRANSFER: {
    SWAP_NETWORK: 'transfer_menu/swap_network',
    MAX_CLICK: 'transfer_menu/max_click',
    TRANSFER_TO_L2: {
      INITIATED: 'transfer_menu/transfer_to_l2_initiated',
      SUCCESS: 'transfer_menu/transfer_to_l2_success',
      ERROR: 'transfer_menu/transfer_to_l2_error',
      REJECT: 'transfer_menu/transfer_to_l2_reject'
    },
    TRANSFER_TO_L1: {
      INITIATED: 'transfer_menu/transfer_to_l1_initiated',
      SUCCESS: 'transfer_menu/transfer_to_l1_success',
      ERROR: 'transfer_menu/transfer_to_l1_error',
      REJECT: 'transfer_menu/transfer_to_l1_reject',
      AUTO: 'transfer_menu/auto_withdrawal_initiated'
    },
    COMPLETE_TRANSFER_TO_L1: {
      INITIATED: 'transfer_menu/complete_transfer_to_l1_initiated',
      SUCCESS: 'transfer_menu/complete_transfer_to_l1_success',
      ERROR: 'transfer_menu/complete_transfer_to_l1_error',
      REJECT: 'transfer_menu/complete_transfer_to_l1_reject'
    }
  },

  /**
   * Select token menu
   */
  SELECT_TOKEN: {
    TOKEN_SELECTED: 'select_token_menu/token_selected'
  },

  /**
   * Account menu
   */
  ACCOUNT: {
    TX_LINK_CLICK: 'account_menu/tx_link_click',
    ACCOUNT_LINK_CLICK: 'account_menu/account_link_click',
    VIEW_TRANSFERS_LOG: 'account_menu/view_transfers_log',
    COMPLETE_TRANSFER_CLICK: 'account_menu/complete_transfer',
    ADDRESS_COPIED: 'account_menu/address_copied'
  },

  /**
   * Login screen
   */
  LOGIN: {
    WALLET_CLICK: 'login_modal/wallet_click',
    LOGIN_ERROR: 'login_modal/login_error',
    BLOCKED_ADDRESS: 'login_modal/blocked_address'
  },

  /**
   * Terms screen
   */
  TERMS_SCREEN: 'terms_screen',

  /**
   * FAQ screen
   */
  FAQ_SCREEN: 'faq_screen',

  /**
   * Tabs
   */
  DISCORD_TAB_CLICK: 'discord_tab_click'
};
