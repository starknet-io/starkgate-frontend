import {
  ChainInfo,
  ChainType,
  WalletErrorType,
  WalletIdL2,
  WalletStatus
} from '@starkware-industries/commons-js-enums';
import {useLogger} from '@starkware-industries/commons-js-hooks';
import {setCookie} from '@starkware-industries/commons-js-utils';
import {
  connect as getStarknetWallet,
  disconnect as resetStarknetWallet,
  getStarknet
} from 'get-starknet';
import {useState} from 'react';

import {useConstants} from './useConstants';
import {useEnvs} from './useEnvs';

export const useStarknetWallet = () => {
  const logger = useLogger('useStarknetWallet');
  const {CONNECTED_L2_WALLET_ID_COOKIE_NAME} = useConstants();
  const {SUPPORTED_L2_CHAIN_ID} = useEnvs();
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [chainName, setChainName] = useState('');
  const [status, setStatus] = useState(WalletStatus.DISCONNECTED);
  const [config, setConfig] = useState(null);

  const connect = async ({autoConnect} = {}) => {
    const doConnect = async () => {
      logger.log('connect');
      try {
        setStatus(WalletStatus.CONNECTING);
        const wallet = await getStarknetWallet({
          modalOptions: {
            theme: 'dark'
          },
          ...(autoConnect ? {showList: false} : {})
        });
        if (!wallet) {
          logger.warn('empty wallet');
          setStatus(WalletStatus.DISCONNECTED);
          reset();
          return;
        }
        const enabled = await wallet
          .enable({showModal: !autoConnect})
          .then(address => address?.length && address[0]);
        if (enabled) {
          logger.log('connect success');
          updateAccount();
          addAccountChangedListener();
        }
      } catch (ex) {
        logger.error('connect failed');
        setStatus(WalletStatus.ERROR);
        setError({
          name: WalletErrorType.CONNECTION_REJECTED_ERROR,
          message: ex.message
        });
      }
    };

    if (![WalletStatus.CONNECTED, WalletStatus.CONNECTING].includes(status)) {
      await doConnect();
    }
  };

  const reset = () => {
    logger.log('reset');
    const disconnected = resetStarknetWallet({clearLastWallet: true, clearDefaultWallet: true});
    if (disconnected) {
      setStatus(WalletStatus.DISCONNECTED);
      setAccount('');
      setConfig(null);
      setCookie(CONNECTED_L2_WALLET_ID_COOKIE_NAME, '');
    }
  };

  const addAccountChangedListener = () => {
    getStarknet().on('accountsChanged', () => {
      setStatus(WalletStatus.DISCONNECTED);
      updateAccount();
    });
  };

  const updateAccount = () => {
    const chainId = getCurrentChainId();
    const {selectedAddress, name, icon} = getStarknet();
    setConfig({
      id: WalletIdL2.GSW,
      name,
      logoPath: icon
    });
    if (chainId === SUPPORTED_L2_CHAIN_ID) {
      setChainId(chainId);
      setChainName(ChainInfo.L2[chainId].NAME);
      setAccount(selectedAddress);
      setStatus(selectedAddress ? WalletStatus.CONNECTED : WalletStatus.DISCONNECTED);
      setError(null);
      setCookie(CONNECTED_L2_WALLET_ID_COOKIE_NAME, WalletIdL2.GSW);
    } else {
      setAccount(null);
      setStatus(WalletStatus.ERROR);
      setError({name: WalletErrorType.CHAIN_UNSUPPORTED_ERROR});
    }
  };

  const getCurrentChainId = () => {
    const {baseUrl} = getStarknet().provider;
    if (baseUrl.includes('alpha-mainnet.starknet.io')) {
      return ChainType.L2.MAIN;
    } else if (baseUrl.includes('alpha4.starknet.io')) {
      return ChainType.L2.GOERLI;
    } else if (baseUrl.match(/^https?:\/\/localhost.*/)) {
      return 'localhost';
    }
  };

  return {
    account,
    chainId,
    chainName,
    status,
    error,
    config,
    connect,
    reset
  };
};
