import React, {useEffect, useRef, useState} from 'react';

import {track, TrackEvent} from '../../analytics';
import {LoginErrorMessage, WalletLogin} from '../../components/UI';
import {ChainInfo, ErrorType, NetworkType, WalletStatus, WalletType} from '../../enums';
import {useConfig, useWalletHandlerProvider} from '../../hooks';
import {useHideModal, useProgressModal} from '../../providers/ModalProvider';
import {useL1Wallet, useL2Wallet, useWallets} from '../../providers/WalletsProvider';
import utils from '../../utils';
import {AUTO_CONNECT_TIMEOUT_DURATION, MODAL_TIMEOUT_DURATION} from './Login.constants';
import styles from './Login.module.scss';
import {
  DOWNLOAD_TEXT,
  MODAL_TXT,
  SUBTITLE_TXT,
  TITLE_TXT,
  UNSUPPORTED_BROWSER_TXT,
  UNSUPPORTED_CHAIN_ID_TXT
} from './Login.strings';

export const Login = () => {
  const {autoConnect} = useConfig();
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [error, setError] = useState(null);
  const [walletType, setWalletType] = useState(WalletType.L1);
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const getWalletHandlers = useWalletHandlerProvider();
  const {status, error: walletError} = useWallets();
  const {connectWallet: connectL1Wallet, isConnected: isConnectedL1Wallet} = useL1Wallet();
  const {connectWallet: connectL2Wallet} = useL2Wallet();
  const {supportedChainId} = useConfig();

  useEffect(() => {
    track(TrackEvent.LOGIN_SCREEN);
    if (!utils.browser.isChrome()) {
      setError({type: ErrorType.UNSUPPORTED_BROWSER, message: UNSUPPORTED_BROWSER_TXT});
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (error) {
      track(TrackEvent.LOGIN.LOGIN_ERROR, error);
    } else if (!error && autoConnect) {
      const handlers = getWalletHandlers(walletType);
      if (handlers.length > 0) {
        timeoutId = setTimeout(() => onWalletConnect(handlers[0]), AUTO_CONNECT_TIMEOUT_DURATION);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [error, walletType, getWalletHandlers]);

  useEffect(() => {
    if (isConnectedL1Wallet) {
      setWalletType(WalletType.L2);
    }
  }, [isConnectedL1Wallet]);

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
    track(TrackEvent.LOGIN.WALLET_CLICK, {name});
    if (!walletHandler.isInstalled()) {
      return walletHandler.install();
    }
    setSelectedWalletName(name);
    return walletType === WalletType.L1 ? connectL1Wallet(config) : connectL2Wallet(config);
  };

  const onDownloadClick = () => {
    track(TrackEvent.LOGIN.DOWNLOAD_CLICK, {walletType});
    const handlers = getWalletHandlers(walletType);
    if (handlers.length > 0) {
      return handlers[0].install();
    }
  };

  const handleWalletError = error => {
    if (error.name === 'ChainUnsupportedError') {
      setError({
        type: ErrorType.UNSUPPORTED_CHAIN_ID,
        message: utils.object.evaluate(UNSUPPORTED_CHAIN_ID_TXT, {
          chainName: ChainInfo.L1[supportedChainId].NAME
        })
      });
    }
  };

  const maybeShowModal = () => {
    maybeHideModal();
    modalTimeoutId.current = setTimeout(() => {
      showProgressModal(selectedWalletName, MODAL_TXT(selectedWalletName));
    }, MODAL_TIMEOUT_DURATION);
  };

  const maybeHideModal = () => {
    if (typeof modalTimeoutId.current === 'number') {
      clearTimeout(modalTimeoutId.current);
      modalTimeoutId.current = null;
    }
    hideModal();
  };

  const renderLoginWallets = () => {
    return getWalletHandlers(walletType).map(walletHandler => {
      const {
        config: {id, description, name, logoPath}
      } = walletHandler;
      return (
        <WalletLogin
          key={id}
          description={description}
          isDisabled={!utils.browser.isChrome()}
          logoPath={logoPath}
          name={name}
          onClick={() => onWalletConnect(walletHandler)}
        />
      );
    });
  };

  return (
    <div className={utils.object.toClasses(styles.login, 'center')}>
      <div className={styles.content}>
        <div className={styles.title}>{TITLE_TXT}</div>
        <p>
          {SUBTITLE_TXT(walletType === WalletType.L1 ? NetworkType.L1.name : NetworkType.L2.name)}
        </p>
        <div className={styles.container}>{renderLoginWallets()}</div>
        {error && <LoginErrorMessage message={error.message} />}
      </div>
      <div className={styles.separator} />
      <div className={styles.download}>
        {DOWNLOAD_TEXT[0]} <span onClick={onDownloadClick}>{DOWNLOAD_TEXT[1]}</span>
      </div>
    </div>
  );
};
