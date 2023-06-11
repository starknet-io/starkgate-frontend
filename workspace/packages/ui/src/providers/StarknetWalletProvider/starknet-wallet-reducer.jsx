import {WalletStatus} from '@starkware-webapps/enums';

export const actions = {
  UPDATE_WALLET: 'StarknetWallet/UPDATE_WALLET'
};

export const initialState = {
  account: '',
  isConnected: false,
  status: WalletStatus.DISCONNECTED,
  chainName: '',
  chainId: null,
  error: null,
  config: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_WALLET:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
