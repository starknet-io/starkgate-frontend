import React, {useEffect} from 'react';

import {ChainInfo, WalletStatus, NetworkType} from '../../../enums';
import {useWalletHandlerProvider} from '../../../hooks';
import {useEnvs} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1} from '../../../providers/TransferProvider';
import {useL1Wallet} from '../../../providers/WalletsProvider';
import {WalletButton} from '../index';

export const EthereumWalletButton = () => {
  const {account, config, error, status, connect} = useL1Wallet();
  const walletHandlers = useWalletHandlerProvider(NetworkType.L1);
  const {SUPPORTED_L1_CHAIN_ID} = useEnvs();
  const {navigateToRoute} = useApp();
  const {showAccountMenu} = useMenu();
  const [, swapToL1] = useIsL1();

  const networkName = 'Ethereum';

  useEffect(() => {
    error && handleWalletError(error);
  }, [error]);

  const handleWalletButtonClick = () => {
    switch (status) {
      case WalletStatus.DISCONNECTED:
        return handleConnectWallet();
      case WalletStatus.CONNECTING:
        return handleConnectingWallet();
      case WalletStatus.CONNECTED:
        return handleConnectedWallet();
      default:
        break;
    }
  };

  const handleConnectedWallet = () => {
    swapToL1();
    showAccountMenu();
    navigateToRoute('/');
  };

  const handleConnectWallet = () => {
    // if (!walletHandlers.isInstalled()) {
    //   return walletHandlers.install();
    // }
    // return connect();
  };

  const handleDisconnectWallet = () => {
    // TODO
  };

  const handleConnectingWallet = () => {
    // TODO
  };

  const handleWalletError = () => {
    // TODO
  };

  return (
    <WalletButton
      account={account}
      chain={ChainInfo.L1[SUPPORTED_L1_CHAIN_ID].NAME}
      network={networkName}
      logoPath={config?.logoPath || ''}
      status={status}
      onClick={handleWalletButtonClick}
    />
  );
};
