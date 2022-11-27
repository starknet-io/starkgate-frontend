import {WalletStatus} from '@starkware-industries/commons-js-enums';
import {useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';

import {useBlockedAddressModal, useErrorModal} from '../providers/ModalProvider';
import {useScreening} from './useScreening';
import {useLoginTracking} from './useTracking';

export const useEthereumWallet = ({enableScreening}) => {
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
    reset,
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

  const connect = async walletConfig => {
    const {connectorId} = walletConfig;
    return connectWallet(connectorId);
  };

  return {...wallet, connect, reset};
};
