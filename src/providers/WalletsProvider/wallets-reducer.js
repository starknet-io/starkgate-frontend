import {WalletStatus} from '../../enums';

export const actions = {
  UPDATE_L1_WALLET: 'Wallets/UPDATE_L1_WALLET',
  UPDATE_L2_WALLET: 'Wallets/UPDATE_L2_WALLET',
  SET_L1_WALLET_CONFIG: 'Wallets/SET_L1_WALLET_CONFIG',
  SET_L2_WALLET_CONFIG: 'Wallets/SET_L2_WALLET_CONFIG'
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
    case actions.UPDATE_L1_WALLET:
      return {
        ...state,
        walletL1: {...state.walletL1, ...action.payload}
      };

    case actions.UPDATE_L2_WALLET:
      return {
        ...state,
        walletL2: {...state.walletL2, ...action.payload}
      };

    case actions.SET_L1_WALLET_CONFIG:
      return {
        ...state,
        walletL1: {
          ...state.walletL1,
          config: action.payload
        }
      };

    case actions.SET_L2_WALLET_CONFIG:
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
