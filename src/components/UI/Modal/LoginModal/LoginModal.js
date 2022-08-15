import {
  ChainInfo,
  LoginErrorType,
  NetworkType,
  WalletErrorType,
  WalletStatus
} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {
  useEnvs,
  useLoginTracking,
  useLoginTranslation,
  useWalletHandlerProvider,
  useDidMountEffect
} from '../../../../hooks';
import {useLogin} from '../../../../providers/AppProvider';
import {useHideModal} from '../../../../providers/ModalProvider';
import {useLoginWallet, useWalletsStatus} from '../../../../providers/WalletsProvider';
import {evaluate} from '../../../../utils';
import {MultiChoiceErrorMessage, MultiChoiceMenu} from '../../index';
import styles from './LoginModal.module.scss';

const AUTO_CONNECT_TIMEOUT_DURATION = 100;

const LoginModal = ({networkName}) => {
  const {titleTxt, unsupportedChainIdTxt} = useLoginTranslation();
  const [trackWalletClick, trackLoginError] = useLoginTracking();
  const {AUTO_CONNECT, SUPPORTED_L1_CHAIN_ID} = useEnvs();
  const [error, setError] = useState(null);
  const {statusL1, statusL2} = useWalletsStatus();
  const [network, setNetwork] = useState(networkName || NetworkType.L1);
  const {walletError, walletStatus, connectWallet} = useLoginWallet(network);
  const walletHandlers = useWalletHandlerProvider(network);
  const {isLoggedIn} = useLogin();
  const hideModal = useHideModal();

  useEffect(() => {
    isLoggedIn && hideModal();
  }, [isLoggedIn]);

  useDidMountEffect(() => {
    if (statusL1 !== WalletStatus.CONNECTED) {
      network !== NetworkType.L1 && setNetwork(NetworkType.L1);
    } else if (statusL2 !== WalletStatus.CONNECTED) {
      network !== NetworkType.L2 && setNetwork(NetworkType.L2);
    }
  }, [statusL1, statusL2]);

  useEffect(() => {
    walletError && handleWalletError(walletError);
  }, [walletError]);

  useEffect(() => {
    let timeoutId;
    if (error) {
      trackLoginError(error);
    } else if (!error && AUTO_CONNECT) {
      if (walletHandlers.length > 0) {
        timeoutId = setTimeout(
          () => onWalletConnect(walletHandlers[0]),
          AUTO_CONNECT_TIMEOUT_DURATION
        );
      }
    }
    return () => clearTimeout(timeoutId);
  }, [error, walletHandlers]);

  const onWalletConnect = walletHandler => {
    const {config} = walletHandler;
    const {name} = config;
    trackWalletClick(name);
    if (!walletHandler.isInstalled()) {
      try {
        return walletHandler.install();
      } catch (ex) {
        setError(ex);
      }
    }
    return connectWallet(config);
  };

  const handleWalletError = error => {
    if (error.name === WalletErrorType.CHAIN_UNSUPPORTED_ERROR) {
      setError({
        type: LoginErrorType.UNSUPPORTED_CHAIN_ID,
        message: evaluate(unsupportedChainIdTxt, {
          chainName: ChainInfo.L1[SUPPORTED_L1_CHAIN_ID].NAME
        })
      });
    }
  };

  const mapLoginWalletsToChoices = () => {
    return walletHandlers.map(walletHandler => {
      const {
        config: {id, description, name, logoPath}
      } = walletHandler;
      return {
        id,
        description,
        isLoading: walletStatus === WalletStatus.CONNECTING,
        logoPath,
        name,
        onClick: () => onWalletConnect(walletHandler)
      };
    });
  };

  return (
    <div className={styles.loginModal}>
      <div className={styles.title}>{evaluate(titleTxt, {networkName: network})}</div>
      <MultiChoiceMenu choices={mapLoginWalletsToChoices()} />
      {error && <MultiChoiceErrorMessage message={error.message} />}
    </div>
  );
};

export default LoginModal;

LoginModal.propTypes = {
  networkName: PropTypes.string
};
