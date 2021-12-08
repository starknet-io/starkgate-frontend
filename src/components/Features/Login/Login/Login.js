import React, {useEffect, useRef, useState} from 'react';
import {ChainUnsupportedError} from 'use-wallet';

import {NetworkType, toChainName, WalletStatus, WalletType} from '../../../../enums';
import {useWalletHandlerProvider} from '../../../../hooks';
import {useCombineWallets} from '../../../../providers/CombineWalletsProvider/hooks';
import {capitalize, toClasses} from '../../../../utils';
import {BackButton, Menu} from '../../../UI';
import {
  useHideModal,
  useWalletConnectionModal
} from '../../ModalProvider/ModalProvider/ModalProvider.hooks';
import {useTransferData} from '../../Transfer/Transfer/Transfer.hooks';
import {WalletLogin} from '../WalletLogin/WalletLogin';
import {MODAL_TIMEOUT_DURATION} from './Login.constants';
import styles from './Login.module.scss';
import {DOWNLOAD_TEXT, SUBTITLE_TXT, TITLE_TXT} from './Login.strings';

export const Login = () => {
  const {isEthereum, isStarknet} = useTransferData();
  const [walletType, setWalletType] = useState(
    isEthereum ? WalletType.ETHEREUM : WalletType.STARKNET
  );
  const [selectedWalletName, setSelectedWalletName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const modalTimeoutId = useRef(null);
  const hideModal = useHideModal();
  const showWalletConnectionModal = useWalletConnectionModal();
  const {status, error, connectWallet, swapWallets} = useCombineWallets();
  const {getWalletHandlers} = useWalletHandlerProvider();

  useEffect(() => {
    error && handleError(error);
  }, [error]);

  useEffect(() => {
    setWalletType(isEthereum ? WalletType.ETHEREUM : WalletType.STARKNET);
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
    return connectWallet(config);
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
          {isStarknet && <BackButton onClick={swapWallets} />}
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
