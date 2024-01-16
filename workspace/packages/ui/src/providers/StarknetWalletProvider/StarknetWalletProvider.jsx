import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from 'react';

import {useConstants, useTranslation} from '@hooks';
import {ChainInfo, WalletErrorType, WalletStatus} from '@starkware-webapps/enums';
import {evaluate} from '@starkware-webapps/utils';
import {getCookie, setCookie} from '@starkware-webapps/utils-browser';
import {toStarknetChainId} from '@starkware-webapps/web3-utils';

import {StarknetWalletContext} from './starknet-wallet-context';
import {actions, initialState, reducer} from './starknet-wallet-reducer';

export const StarknetWalletProvider = ({
  autoConnect,
  getLibrary,
  chain = 'goerli',
  options = {},
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    connect: connectStarknetWallet,
    disconnect: resetStarknetWallet,
    getStarknet: getStarknetWallet
  } = getLibrary();

  const {CONNECTED_L2_WALLET_ID_COOKIE_NAME} = useConstants();
  const {UNSUPPORTED_CHAIN_TXT} = useTranslation('StarknetWalletProvider');

  useEffect(() => {
    const connectedWalletIdCookie = getCookie(CONNECTED_L2_WALLET_ID_COOKIE_NAME);
    if (autoConnect && connectedWalletIdCookie) {
      setTimeout(() => {
        connect({modalMode: 'neverAsk'});
      }, 0);
    }
  }, []);

  const getStarknet = async () => {
    return await getStarknetWallet().getLastConnectedWallet();
  };

  const connect = async (walletOptions = {}) => {
    const doConnect = async () => {
      try {
        updateWallet({status: WalletStatus.CONNECTING});
        const wallet = await connectStarknetWallet({
          modalTheme: 'dark',
          modalMode: 'alwaysAsk',
          ...walletOptions
        });
        if (!wallet) {
          updateWallet({status: WalletStatus.DISCONNECTED});
          await disconnect();
          return;
        }
        const enabled = await wallet.enable(options).then(address => address?.length && address[0]);

        if (enabled) {
          await updateAccount();
          await addAccountChangedListener();
        }
      } catch (ex) {
        updateWallet({
          status: WalletStatus.ERROR,
          error: {
            name: WalletErrorType.CONNECTION_REJECTED_ERROR,
            message: ex.message
          }
        });
      }
    };

    if (![WalletStatus.CONNECTED, WalletStatus.CONNECTING].includes(state.status)) {
      await doConnect();
    }
  };

  const disconnect = async () => {
    await resetStarknetWallet({clearLastWallet: true});
    updateWallet({status: WalletStatus.DISCONNECTED, config: null, account: ''});
    setCookie(CONNECTED_L2_WALLET_ID_COOKIE_NAME, '');
  };

  const addAccountChangedListener = async () => {
    const wallet = await getStarknet();
    wallet.on('accountsChanged', async () => {
      updateWallet({status: WalletStatus.DISCONNECTED});
      await updateAccount();
    });
  };

  const updateAccount = async () => {
    const {id, selectedAddress, name, icon, account} = await getStarknet();
    if (account?.provider) {
      const walletChainId = await account.provider.getChainId();
      const chainId = toStarknetChainId(chain);
      if (walletChainId === chainId) {
        updateWallet({
          account: selectedAddress || '',
          status: selectedAddress ? WalletStatus.CONNECTED : WalletStatus.DISCONNECTED,
          error: null,
          chainId,
          chainName: ChainInfo.L2[chainId].NAME,
          config: {
            name,
            logoPath: icon
          }
        });
        setCookie(CONNECTED_L2_WALLET_ID_COOKIE_NAME, id);
      } else {
        updateWallet({
          status: WalletStatus.ERROR,
          error: {
            name: WalletErrorType.CHAIN_UNSUPPORTED_ERROR,
            message: evaluate(UNSUPPORTED_CHAIN_TXT, {
              chain: ChainInfo.L2[chainId].NAME
            })
          }
        });
      }
    }
  };

  const updateWallet = payload => {
    dispatch({
      type: actions.UPDATE_WALLET,
      payload
    });
  };

  const context = {
    ...state,
    connect,
    disconnect
  };

  return (
    <StarknetWalletContext.Provider displayName="StarknetWalletContext" value={context}>
      {children}
    </StarknetWalletContext.Provider>
  );
};

StarknetWalletProvider.propTypes = {
  autoConnect: PropTypes.bool,
  getLibrary: PropTypes.func,
  chain: PropTypes.string,
  options: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
