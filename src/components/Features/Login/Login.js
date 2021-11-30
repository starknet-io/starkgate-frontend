import React, {useEffect, useRef, useState} from 'react';
import {ChainUnsupportedError} from 'use-wallet';

import {NetworkType, toChainName, WalletType} from '../../../enums';
import {useWalletHandlerProvider} from '../../../hooks';
import {capitalize, toClasses} from '../../../utils';
import {BackButton, Menu} from '../../UI';
import {useHideModal, useWalletConnectionModal} from '../ModalProvider/ModalProvider.hooks';
import {useTransferData} from '../Transfer/Transfer.hooks';
import {WalletStatus} from '../Wallet/Wallet.enums';
import {useWallets} from '../Wallet/Wallet.hooks';
import {MODAL_TIMEOUT_DURATION} from '../Wallet/WalletButton/WalletButton.constants';
import {WalletLogin} from '../Wallet/WalletLogin/WalletLogin';
import styles from './Login.module.scss';
import {DOWNLOAD_TEXT, SUBTITLE_TXT, TITLE_TXT} from './Login.strings';

export const Login = () => {
  const {isEthereum, isStarknet} = useTransferData();
  const [walletType, setWalletType] = useState(isEthereum ? WalletType.L1 : WalletType.L2);
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showWalletConnectionModal = useWalletConnectionModal();
  const {status, error, connectWallet, swapWallets} = useWallets();
  const {getWalletHandlers} = useWalletHandlerProvider();

  useEffect(() => {
    error && handleError(error);
  }, [error]);

  useEffect(() => {
    setWalletType(isEthereum ? WalletType.L1 : WalletType.L2);
  }, [isEthereum]);

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
    return connectWallet(walletHandler);
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
      showWalletConnectionModal(selectedWalletName);
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
        config: {id, description, name, loginLogoPath}
      } = walletHandler;
      return (
        <WalletLogin
          key={id}
          description={description}
          logoPath={loginLogoPath}
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
          {isStarknet && <BackButton onClick={swapWallets} />}
          <div className={styles.title}>{TITLE_TXT}</div>
          <p>
            {SUBTITLE_TXT(
              walletType === WalletType.L1 ? NetworkType.ETHEREUM.name : NetworkType.STARKNET.name
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
