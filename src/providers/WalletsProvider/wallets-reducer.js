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
  chainId: -1,
  error: null,
  config: null
};

export const initialState = {
  l1Wallet: {
    ...initialWalletState
  },
  l2Wallet: {
    ...initialWalletState
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_L1_WALLET:
      return {
        ...state,
        l1Wallet: {...state.l1Wallet, ...action.payload}
      };

    case actions.UPDATE_L2_WALLET:
      return {
        ...state,
        l2Wallet: {...state.l2Wallet, ...action.payload}
      };

    case actions.SET_L1_WALLET_CONFIG:
      return {
        ...state,
        l1Wallet: {
          ...state.l1Wallet,
          config: action.payload
        }
      };

    case actions.SET_L2_WALLET_CONFIG:
      return {
        ...state,
        l2Wallet: {
          ...state.l2Wallet,
          config: action.payload
        }
      };

    default:
      return state;
  }
};
