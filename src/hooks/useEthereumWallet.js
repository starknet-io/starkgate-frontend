import {WalletStatus} from '@starkware-industries/commons-js-enums';
import {useLogger} from '@starkware-industries/commons-js-hooks';
import {setCookie} from '@starkware-industries/commons-js-utils';
import {useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';

import {CONNECTED_L1_WALLET_ID_COOKIE_NAME} from '../config/constants';
import {useBlockedAddressModal, useErrorModal} from '../providers/ModalProvider';
import {useScreening} from './useScreening';
import {useLoginTracking} from './useTracking';

export const useEthereumWallet = ({enableScreening}) => {
  const logger = useLogger('useEthereumWallet');
  const [wallet, setWallet] = useState({
    error: null,
    account: '',
    chainId: -1,
    chainName: '',
    status: WalletStatus.DISCONNECTED
  });

  const {
    account,
    status,
    error,
    chainId,
    reset: resetWallet,
    networkName: chainName,
    connect: connectWallet
  } = useWallet();

  const {
    isScreening,
    blocked,
    error: screeningError
  } = useScreening(enableScreening ? account : null);
  const showBlockedAddressModal = useBlockedAddressModal();
  const [, , trackBlockedAddress] = useLoginTracking();
  const showErrorModal = useErrorModal();
  const isBlockedOrError = blocked || screeningError;
  const isUnblocked = !isScreening && !isBlockedOrError;
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (enableScreening) {
      if (!isScreening && !screeningError) {
        if (blocked) {
          showBlockedAddressModal(account);
          trackBlockedAddress(account);
        } else {
          updateWallet();
        }
      }
    }
  }, [isScreening]);

  useEffect(() => {
    if (!enableScreening) {
      updateWallet();
    }
  }, [account]);

  useEffect(() => {
    if (screeningError) {
      const {title, message} = screeningError;
      showErrorModal(title, message);
    }
  }, [screeningError]);

  useEffect(() => {
    // To support serializable object in the store
    const serializedError = status === WalletStatus.ERROR ? {...error} : null;
    if (isUnblocked) {
      updateWallet({error: serializedError});
    }
  }, [status, error, isUnblocked]);

  useEffect(() => {
    if (status === WalletStatus.CONNECTED && isBlockedOrError) {
      reset();
    }
  }, [status, isScreening]);

  useEffect(() => {
    if (status === WalletStatus.CONNECTED) {
      setCookie(CONNECTED_L1_WALLET_ID_COOKIE_NAME, config.id);
    }
  }, [status]);

  const updateWallet = (customValues = {}) => {
    setWallet(prevWallet => ({
      ...prevWallet,
      account,
      status,
      error,
      chainId,
      chainName,
      ...customValues
    }));
  };

  const reset = () => {
    logger.log('reset');
    setConfig(null);
    setCookie(CONNECTED_L1_WALLET_ID_COOKIE_NAME, '');
    return resetWallet();
  };

  const connect = async walletConfig => {
    logger.log('connect', walletConfig);
    const {connectorId} = walletConfig;
    setConfig(walletConfig);
    return connectWallet(connectorId);
  };

  return {...wallet, config, connect, reset};
};
