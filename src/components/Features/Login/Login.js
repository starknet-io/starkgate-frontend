import React, {useEffect, useRef, useState} from 'react';

import {NetworkType, toChainName, WalletStatus, WalletType} from '../../../enums';
import {useConfig, useWalletHandlerProvider} from '../../../hooks';
import {useL1Wallet, useL2Wallet, useWallets} from '../../../providers/WalletsProvider';
import utils from '../../../utils';
import {Menu, WalletLogin} from '../../UI';
import {useHideModal, useProgressModal} from '../ModalProvider/ModalProvider.hooks';
import {AUTO_CONNECT_TIMEOUT_DURATION, MODAL_TIMEOUT_DURATION} from './Login.constants';
import styles from './Login.module.scss';
import {
  DOWNLOAD_TEXT,
  MODAL_TXT,
  SUBTITLE_TXT,
  TITLE_TXT,
  UNSUPPORTED_BROWSER_TXT
} from './Login.strings';

export const Login = () => {
  const {autoConnect} = useConfig();
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [walletType, setWalletType] = useState(WalletType.L1);
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const getWalletHandlers = useWalletHandlerProvider();
  const {status, error} = useWallets();
  const {connectWallet: connectL1Wallet, isConnected} = useL1Wallet();
  const {connectWallet: connectL2Wallet} = useL2Wallet();

  useEffect(() => {
    let timeoutId;
    if (!utils.browser.isChrome()) {
      setErrorMsg(UNSUPPORTED_BROWSER_TXT);
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
    isConnected && setWalletType(WalletType.L2);
  }, [isConnected]);

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
    }
    return () => {
      maybeHideModal();
    };
  }, [status]);

  const onWalletConnect = walletHandler => {
    if (!walletHandler.isInstalled()) {
      return walletHandler.install();
    }
    const {config} = walletHandler;
    setSelectedWalletName(config.name);
    return walletType === WalletType.L1 ? connectL1Wallet(config) : connectL2Wallet(config);
  };

  const onDownloadClick = () => {
    const handlers = getWalletHandlers(walletType);
    if (handlers.length > 0) {
      return handlers[0].install();
    }
  };

  const handleError = error => {
    if (error.name === 'ChainUnsupportedError') {
      const msg = error.message.replace(/\d+/g, match => {
        let msg = match;
        const chainName = utils.string.capitalize(toChainName(Number(match)));
        if (chainName) {
          msg += ` (${utils.string.capitalize(toChainName(Number(match)))})`;
        }
        return msg;
      });
      setErrorMsg(msg);
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
    <Menu>
      <div className={utils.object.toClasses(styles.login, 'center')}>
        <div className={styles.content}>
          <div className={styles.title}>{TITLE_TXT}</div>
          <p>
            {SUBTITLE_TXT(walletType === WalletType.L1 ? NetworkType.L1.name : NetworkType.L2.name)}
          </p>
          <div className={styles.container}>{renderLoginWallets()}</div>
          {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
        </div>
        <div className={styles.separator} />
        <div className={styles.download}>
          {DOWNLOAD_TEXT[0]} <span onClick={onDownloadClick}>{DOWNLOAD_TEXT[1]}</span>
        </div>
      </div>
    </Menu>
  );
};
