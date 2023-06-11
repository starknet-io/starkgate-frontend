import {useEffect, useRef, useState} from 'react';
import {useWallet} from 'use-wallet';

import {SCREENING_ENDPOINT, screenAddress} from '@api';
import {CONNECTED_L1_WALLET_ID_COOKIE_NAME} from '@config/constants';
import {useLoginTracking} from '@hooks';
import {useBlockedAddressModal, useErrorModal} from '@providers';
import {WalletStatus, isConnected, isError} from '@starkware-webapps/enums';
import {useLogger} from '@starkware-webapps/ui';
import {setCookie} from '@starkware-webapps/utils-browser';
import {useQuery} from '@tanstack/react-query';

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
    data: blocked,
    error: screeningError,
    isFetching: isScreening
  } = useQuery({
    queryKey: [SCREENING_ENDPOINT, account],
    queryFn: () => screenAddress(account),
    enabled: !!(account && enableScreening),
    refetchIntervalInBackground: false
  });

  const showBlockedAddressModal = useBlockedAddressModal();
  const [, , trackBlockedAddress] = useLoginTracking();
  const showErrorModal = useErrorModal();
  const isBlocked = !isScreening && blocked;
  const isScreeningError = !isScreening && screeningError;
  const isBlockedOrError = isBlocked || isScreeningError;
  const isUnblocked = !isScreening && !isBlockedOrError;
  const [config, setConfig] = useState(null);
  const connectResolveRef = useRef();

  useEffect(() => {
    if (enableScreening) {
      if (!isScreening && !screeningError) {
        if (isBlocked) {
          showBlockedAddressModal(account);
          trackBlockedAddress({account});
        } else {
          updateWallet();
        }
        connectResolveRef.current?.resolve();
      }
    }
  }, [isScreening]);

  useEffect(() => {
    if (!enableScreening) {
      updateWallet();
      connectResolveRef.current?.resolve();
    }
  }, [account]);

  useEffect(() => {
    if (isScreeningError) {
      const {title, message} = screeningError;
      showErrorModal(title, message);
    }
  }, [isScreeningError]);

  useEffect(() => {
    // To support serializable object in the store
    const serializedError = isError(status) ? {...error} : null;
    if (isUnblocked) {
      updateWallet({error: serializedError});
      serializedError && connectResolveRef.current?.resolve();
    }
  }, [status, error, isUnblocked]);

  useEffect(() => {
    if (isConnected(status) && isBlockedOrError) {
      reset();
    }
  }, [status, isBlockedOrError]);

  useEffect(() => {
    if (isConnected(status)) {
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
    return new Promise(resolve => {
      connectResolveRef.current = {resolve};
      connectWallet(connectorId);
    });
  };

  return {...wallet, config, connect, reset};
};
