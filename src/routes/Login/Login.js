import React, {useEffect, useRef, useState} from 'react';

import {LoginErrorMessage, WalletLogin} from '../../components/UI';
import {
  ChainInfo,
  LoginErrorType,
  NetworkType,
  WalletErrorType,
  WalletStatus,
  WalletType
} from '../../enums';
import {
  useEnvs,
  useLoginTracking,
  useLoginTranslation,
  useWalletHandlerProvider
} from '../../hooks';
import {useHideModal, useProgressModal} from '../../providers/ModalProvider';
import {useIsL1, useIsL2} from '../../providers/TransferProvider';
import {useWallets} from '../../providers/WalletsProvider';
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
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [error, setError] = useState(null);
  const [walletType, setWalletType] = useState(WalletType.L1);
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const getWalletHandlers = useWalletHandlerProvider();
  const {status, error: walletError, connectWallet, isConnected} = useWallets();
  const [, swapToL1] = useIsL1();
  const [, swapToL2] = useIsL2();

  useEffect(() => {
    trackLoginScreen();
    if (!utils.browser.isChrome()) {
      setError({type: LoginErrorType.UNSUPPORTED_BROWSER, message: unsupportedBrowserTxt});
    }
    return () => swapToL1();
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
    if (isConnected) {
      setWalletType(WalletType.L2);
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
    trackDownloadClick(walletType);
    const handlers = getWalletHandlers(walletType);
    if (handlers.length > 0) {
      return handlers[0].install();
    }
  };

  const handleWalletError = error => {
    if (error.name === WalletErrorType.CHAIN_UNSUPPORTED_ERROR) {
      setError({
        type: LoginErrorType.UNSUPPORTED_CHAIN_ID,
        message: utils.object.evaluate(unsupportedChainIdTxt, {
          chainName: ChainInfo.L1[supportedChainId].NAME
        })
      });
    }
  };

  const maybeShowModal = () => {
    maybeHideModal();
    modalTimeoutId.current = setTimeout(() => {
      showProgressModal(
        selectedWalletName,
        utils.object.evaluate(modalTxt, {walletName: selectedWalletName})
      );
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
