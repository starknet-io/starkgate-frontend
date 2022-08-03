import {WalletStatus} from '@starkware-industries/commons-js-enums';

export const actions = {
  UPDATE_WALLET_L1: 'Wallets/UPDATE_WALLET_L1',
  UPDATE_WALLET_L2: 'Wallets/UPDATE_WALLET_L2',
  SET_WALLET_CONFIG_L1: 'Wallets/SET_WALLET_CONFIG_L1',
  SET_WALLET_CONFIG_L2: 'Wallets/SET_WALLET_CONFIG_L2'
};

const initialWalletState = {
  account: '',
  isConnected: false,
  status: WalletStatus.DISCONNECTED,
  chainName: '',
  chainId: null,
  error: null,
  config: null
};

export const initialState = {
  walletL1: {
    ...initialWalletState
  },
  walletL2: {
    ...initialWalletState
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_WALLET_L1:
      return {
        ...state,
        walletL1: {...state.walletL1, ...action.payload}
      };

    case actions.UPDATE_WALLET_L2:
      return {
        ...state,
        walletL2: {...state.walletL2, ...action.payload}
      };

    case actions.SET_WALLET_CONFIG_L1:
      return {
        ...state,
        walletL1: {
          ...state.walletL1,
          config: action.payload
        }
      };

    case actions.SET_WALLET_CONFIG_L2:
      return {
        ...state,
        walletL2: {
          ...state.walletL2,
          config: action.payload
        }
      };

    default:
      return state;
  }
};
