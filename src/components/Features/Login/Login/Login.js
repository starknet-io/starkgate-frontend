import React, {useEffect, useRef, useState} from 'react';
import {ChainUnsupportedError} from 'use-wallet';

import {NetworkType, toChainName, WalletStatus, WalletType} from '../../../../enums';
import {useWalletHandlerProvider} from '../../../../hooks';
import {
  useWallets,
  useEthereumWallet,
  useStarknetWallet
} from '../../../../providers/WalletsProvider/hooks';
import {capitalize, toClasses} from '../../../../utils';
import {Menu} from '../../../UI';
import {useHideModal, useProgressModal} from '../../ModalProvider/ModalProvider.hooks';
import {WalletLogin} from '../WalletLogin/WalletLogin';
import {MODAL_TIMEOUT_DURATION} from './Login.constants';
import styles from './Login.module.scss';
import {DOWNLOAD_TEXT, MODAL_TXT, SUBTITLE_TXT, TITLE_TXT} from './Login.strings';

export const Login = () => {
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [walletType, setWalletType] = useState(WalletType.ETHEREUM);
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showProgressModal = useProgressModal();
  const {status, error} = useWallets();
  const getWalletHandlers = useWalletHandlerProvider();
  const {connectWallet: connectEthereumWallet, isConnected} = useEthereumWallet();
  const {connectWallet: connectStarknetWallet} = useStarknetWallet();

  useEffect(() => {
    isConnected && setWalletType(WalletType.STARKNET);
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
    return walletType === WalletType.ETHEREUM
      ? connectEthereumWallet(config)
      : connectStarknetWallet(config);
  };

  const onDownloadClick = () => {
    const handlers = getWalletHandlers(walletType);
    if (handlers.length > 0) {
      return handlers[0].install();
    }
  };

  const handleError = error => {
    if (error.name === ChainUnsupportedError.name) {
      const msg = error.message.replace(
        /\d+/g,
        match => `${match} (${capitalize(toChainName(Number(match)))})`
      );
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
          logoPath={logoPath}
          name={name}
          onClick={() => onWalletConnect(walletHandler)}
        />
      );
    });
  };

  return (
    <Menu>
      <div className={toClasses(styles.login, 'center')}>
        <div className={styles.content}>
          <div className={styles.title}>{TITLE_TXT}</div>
          <p>
            {SUBTITLE_TXT(
              walletType === WalletType.ETHEREUM
                ? NetworkType.ETHEREUM.name
                : NetworkType.STARKNET.name
            )}
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
