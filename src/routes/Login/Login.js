import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {track, TrackEvent} from '../../analytics';
import {WalletLogin} from '../../components/UI';
import {ChainInfo, NetworkType, WalletStatus, WalletType} from '../../enums';
import {useEnvs, useTranslation, useWalletHandlerProvider} from '../../hooks';
import {useLogin} from '../../providers/AppProvider';
import {useHideModal, useProgressModal} from '../../providers/ModalProvider';
import {useL1Wallet, useL2Wallet, useWallets} from '../../providers/WalletsProvider';
import utils from '../../utils';
import styles from './Login.module.scss';

const MODAL_TIMEOUT_DURATION = 2000;
const AUTO_CONNECT_TIMEOUT_DURATION = 100;

export const Login = () => {
  const {titleTxt, subtitleTxt, downloadTxt, modalTxt, unsupportedBrowserTxt} =
    useTranslation('menus.login');
  const {autoConnect} = useEnvs();
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [walletType, setWalletType] = useState(WalletType.L1);
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const getWalletHandlers = useWalletHandlerProvider();
  const {status, error} = useWallets();
  const {connectWallet: connectL1Wallet, isConnected: isConnectedL1Wallet} = useL1Wallet();
  const {connectWallet: connectL2Wallet, isConnected: isConnectedL2Wallet} = useL2Wallet();
  const {login} = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    track(TrackEvent.LOGIN_SCREEN);
  }, []);

  useEffect(() => {
    let timeoutId;
    if (!utils.browser.isChrome()) {
      track(TrackEvent.LOGIN.LOGIN_ERROR, {message: unsupportedBrowserTxt});
      setErrorMsg(unsupportedBrowserTxt);
      return;
    }
    if (autoConnect) {
      const handlers = getWalletHandlers(walletType);
      if (handlers.length > 0) {
        timeoutId = setTimeout(() => onWalletConnect(handlers[0]), AUTO_CONNECT_TIMEOUT_DURATION);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [walletType, getWalletHandlers]);

  useEffect(() => {
    if (isConnectedL1Wallet && isConnectedL2Wallet) {
      login();
      navigate('/');
    }
    if (isConnectedL1Wallet) {
      setWalletType(WalletType.L2);
    }
  }, [isConnectedL1Wallet, isConnectedL2Wallet]);

  useEffect(() => {
    error && handleError(error);
  }, [error]);

  useEffect(() => {
    switch (status) {
      case WalletStatus.CONNECTING:
        maybeShowModal();
        break;
      case WalletStatus.CONNECTED:
        setSelectedWalletName('');
        setErrorMsg('');
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

  const handleError = error => {
    if (error.name === 'ChainUnsupportedError') {
      const message = error.message.replace(/\d+/g, match => {
        let msg = match;
        const chainName = utils.string.capitalize(ChainInfo.L1[Number(match)]?.NAME);
        if (chainName) {
          msg += ` (${utils.string.capitalize(ChainInfo.L1[Number(match)].NAME)})`;
        }
        return msg;
      });
      track(TrackEvent.LOGIN.LOGIN_ERROR, {message});
      setErrorMsg(message);
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
        {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      </div>
      <div className={styles.separator} />
      <div className={styles.download}>
        {downloadTxt[0]} <span onClick={onDownloadClick}>{downloadTxt[1]}</span>
      </div>
    </div>
  );
};
