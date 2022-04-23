import React, {useEffect, useRef, useState} from 'react';

import {LoginErrorMessage, WalletLogin} from '../../components/UI';
import {ChainInfo, ErrorType, NetworkType, WalletStatus, WalletType} from '../../enums';
import {
  useEnvs,
  useLoginTracking,
  useLoginTranslation,
  useWalletHandlerProvider
} from '../../hooks';
import {useConnectingWalletModal, useHideModal} from '../../providers/ModalProvider';
import {useL1Wallet, useL2Wallet, useWallets} from '../../providers/WalletsProvider';
import utils from '../../utils';
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
  const {autoConnect, supportedChainId} = useEnvs();
  const [walletConfig, setWalletConfig] = useState(null);
  const [error, setError] = useState(null);
  const [walletType, setWalletType] = useState(WalletType.L1);
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showConnectingWalletModal = useConnectingWalletModal();
  const getWalletHandlers = useWalletHandlerProvider();
  const {status, error: walletError} = useWallets();
  const {connectWallet: connectL1Wallet, isConnected: isConnectedL1Wallet} = useL1Wallet();
  const {connectWallet: connectL2Wallet} = useL2Wallet();

  useEffect(() => {
    trackLoginScreen();
    if (!utils.browser.isChrome()) {
      setError({type: ErrorType.UNSUPPORTED_BROWSER, message: unsupportedBrowserTxt});
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (error) {
      trackLoginError(error);
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
  }, [status, walletConfig]);

  const onWalletConnect = walletHandler => {
    const {config} = walletHandler;
    trackWalletClick(config.name);
    if (!walletHandler.isInstalled()) {
      return walletHandler.install();
    }
    setWalletConfig(config);
    return walletType === WalletType.L1 ? connectL1Wallet(config) : connectL2Wallet(config);
  };

  const onDownloadClick = () => {
    trackDownloadClick(walletType);
    const handlers = getWalletHandlers(walletType);
    if (handlers.length > 0) {
      return handlers[0].install();
    }
  };

  const handleWalletError = error => {
    if (error.name === 'ChainUnsupportedError') {
      setError({
        type: ErrorType.UNSUPPORTED_CHAIN_ID,
        message: utils.object.evaluate(unsupportedChainIdTxt, {
          chainName: ChainInfo.L1[supportedChainId].NAME
        })
      });
    } else if (error.name === 'ConnectionRejectedError') {
      maybeShowModal();
    }
  };

  const maybeShowModal = () => {
    if (walletConfig) {
      maybeHideModal();
      modalTimeoutId.current = setTimeout(() => {
        showConnectingWalletModal(walletConfig.name, walletConfig.logoPath);
      }, MODAL_TIMEOUT_DURATION);
    }
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
        <div className={styles.title}>{titleTxt}</div>
        <p>
          {utils.object.evaluate(subtitleTxt, {
            networkName: walletType === WalletType.L1 ? NetworkType.L1.name : NetworkType.L2.name
          })}
        </p>
        <div className={styles.container}>{renderLoginWallets()}</div>
        {error && <LoginErrorMessage message={error.message} />}
      </div>
      <div className={styles.separator} />
      <div className={styles.download}>
        {downloadTxt[0]} <span onClick={onDownloadClick}>{downloadTxt[1]}</span>
      </div>
    </div>
  );
};
