import {WalletStatus} from './Wallet.enums';

export const actions = {
  SET_ACTIVE_WALLET_ACTION: 'Wallets/SET_ACTIVE_WALLET_ACTION',
  RESET_ACTIVE_WALLET_ACTION: 'Wallets/RESET_ACTIVE_WALLET_ACTION',
  SET_WALLET_CONFIG_ACTION: 'Wallets/SET_WALLET_CONFIG_ACTION',
  RESET_WALLET_CONFIG_ACTION: 'Wallets/RESET_WALLET_CONFIG_ACTION'
};

export const initialState = {
  activeWallet: {
    account: '',
    isConnected: false,
    status: WalletStatus.DISCONNECTED,
    chainName: '',
    chainId: -1,
    error: null
  },
  l1WalletConfig: null,
  l2WalletConfig: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_ACTIVE_WALLET_ACTION:
      return {
        ...state,
        activeWallet: action.payload
      };

    case actions.RESET_ACTIVE_WALLET_ACTION:
      return {
        ...state,
        activeWallet: initialState.activeWallet
      };

    case actions.SET_WALLET_CONFIG_ACTION: {
      const walletConfig = action.payload;
      return {
        ...state,
        [`l${walletConfig.type}WalletConfig`]: walletConfig
      };
    }

    case actions.RESET_WALLET_CONFIG_ACTION: {
      return {
        ...state,
        [`l${state.activeWallet.type}WalletConfig`]: null
      };
    }

    default:
      return state;
  }
};
