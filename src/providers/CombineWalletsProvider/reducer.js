import {WalletStatus} from '../../enums';

export const actions = {
  UPDATE_ETHEREUM_WALLET: 'CombineWallets/UPDATE_ETHEREUM_WALLET',
  UPDATE_STARKNET_WALLET: 'CombineWallets/UPDATE_STARKNET_WALLET',
  SET_ETHEREUM_WALLET_CONFIG: 'CombineWallets/SET_ETHEREUM_WALLET_CONFIG',
  SET_STARKNET_WALLET_CONFIG: 'CombineWallets/SET_STARKNET_WALLET_CONFIG'
};

export const initialState = {
  ethereumWallet: {
    library: null,
    account: '',
    isConnected: false,
    status: WalletStatus.DISCONNECTED,
    chainName: '',
    chainId: -1,
    error: null,
    config: null
  },
  starknetWallet: {
    library: null,
    account: '',
    isConnected: false,
    status: WalletStatus.DISCONNECTED,
    chainName: '',
    chainId: -1,
    error: null,
    config: null
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_ETHEREUM_WALLET:
      return {
        ...state,
        ethereumWallet: {...state.ethereumWallet, ...action.payload}
      };

    case actions.UPDATE_STARKNET_WALLET:
      return {
        ...state,
        starknetWallet: {...state.starknetWallet, ...action.payload}
      };

    case actions.SET_ETHEREUM_WALLET_CONFIG:
      return {
        ...state,
        ethereumWallet: {
          ...state.ethereumWallet,
          config: action.payload
        }
      };

    case actions.SET_STARKNET_WALLET_CONFIG:
      return {
        ...state,
        starknetWallet: {
          ...state.starknetWallet,
          config: action.payload
        }
      };

    default:
      return state;
  }
};
