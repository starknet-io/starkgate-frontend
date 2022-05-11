import React, {useEffect, useRef, useState} from 'react';

import {MultiChoiceMenu} from '../../components/UI';
import {
  ActionType,
  ChainInfo,
  LoginErrorType,
  NetworkType,
  WalletErrorType,
  WalletStatus
} from '../../enums';
import {
  useEnvs,
  useLoginTracking,
  useLoginTranslation,
  useWalletHandlerProvider
} from '../../hooks';
import {useHideModal, useProgressModal} from '../../providers/ModalProvider';
import {useIsL1, useIsL2, useTransfer} from '../../providers/TransferProvider';
import {useWallets} from '../../providers/WalletsProvider';
import {evaluate, isChrome} from '../../utils';
import styles from './Login.module.scss';

const MODAL_TIMEOUT_DURATION = 2000;
const AUTO_CONNECT_TIMEOUT_DURATION = 100;

export const Login = () => {
  const {
    titleTxt,
    subtitleTxt,
    downloadTxt,
    modalTxt,
    unsupportedBrowserTxt,
    unsupportedChainIdTxt
  } = useLoginTranslation();
  const [trackLoginScreen, trackDownloadClick, trackWalletClick, trackLoginError] =
    useLoginTracking();
  const {autoConnect, supportedL1ChainId} = useEnvs();
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [error, setError] = useState(null);
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();
  const {action} = useTransfer();
  const {status, error: walletError, connectWallet, isConnected} = useWallets();
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const walletHandlers = useWalletHandlerProvider(action);

  useEffect(() => {
    trackLoginScreen();
    if (!isChrome()) {
      setError({type: LoginErrorType.UNSUPPORTED_BROWSER, message: unsupportedBrowserTxt});
    }
    return () => swapToL1();
  }, []);

  useEffect(() => {
    let timeoutId;
    if (error) {
      trackLoginError(error);
    } else if (!error && autoConnect) {
      if (walletHandlers.length > 0) {
        timeoutId = setTimeout(
          () => onWalletConnect(walletHandlers[0]),
          AUTO_CONNECT_TIMEOUT_DURATION
        );
      }
    }
    return () => clearTimeout(timeoutId);
  }, [error, walletHandlers]);

  useEffect(() => {
    if (isConnected) {
      swapToL2();
    }
  }, [isConnected]);

  useEffect(() => {
    walletError && handleWalletError(walletError);
  }, [walletError]);

  useEffect(() => {
    switch (status) {
      case WalletStatus.CONNECTING:
        maybeShowModal();
        break;
      case WalletStatus.CONNECTED:
        setSelectedWalletName('');
        setError(null);
        maybeHideModal();
        break;
      case WalletStatus.ERROR:
      case WalletStatus.DISCONNECTED:
        maybeHideModal();
        break;
      default:
        break;
    }
    return () => {
      maybeHideModal();
    };
  }, [status]);

  const onWalletConnect = walletHandler => {
    const {config} = walletHandler;
    const {name} = config;
    trackWalletClick(name);
    if (!walletHandler.isInstalled()) {
      return walletHandler.install();
    }
    setSelectedWalletName(name);
    return connectWallet(config);
  };

  const onDownloadClick = () => {
    trackDownloadClick();
    if (walletHandlers.length > 0) {
      return walletHandlers[0].install();
    }
  };

  const handleWalletError = error => {
    if (error.name === WalletErrorType.CHAIN_UNSUPPORTED_ERROR) {
      setError({
        type: LoginErrorType.UNSUPPORTED_CHAIN_ID,
        message: evaluate(unsupportedChainIdTxt, {
          chainName: ChainInfo.L1[supportedL1ChainId].NAME
        })
      });
    }
  };

  const maybeShowModal = () => {
    maybeHideModal();
    modalTimeoutId.current = setTimeout(() => {
      showProgressModal(selectedWalletName, evaluate(modalTxt, {walletName: selectedWalletName}));
    }, MODAL_TIMEOUT_DURATION);
  };

  const maybeHideModal = () => {
    if (typeof modalTimeoutId.current === 'number') {
      clearTimeout(modalTimeoutId.current);
      modalTimeoutId.current = null;
    }
    hideModal();
  };

  const mapLoginWalletsToChoices = () => {
    return walletHandlers.map(walletHandler => {
      const {
        config: {id, description, name, logoPath}
      } = walletHandler;
      return {
        id,
        description,
        isDisabled: !isChrome(),
        logoPath,
        name,
        onClick: () => onWalletConnect(walletHandler)
      };
    });
  };

  return (
    <div className={styles.login}>
      <MultiChoiceMenu
        choices={mapLoginWalletsToChoices()}
        description={evaluate(subtitleTxt, {
          networkName:
            action === ActionType.TRANSFER_TO_L2 ? NetworkType.L1.name : NetworkType.L2.name
        })}
        error={error}
        footer={
          <div className={styles.download}>
            {downloadTxt[0]} <span onClick={onDownloadClick}>{downloadTxt[1]}</span>
          </div>
        }
        title={titleTxt}
      />
    </div>
  );
};
