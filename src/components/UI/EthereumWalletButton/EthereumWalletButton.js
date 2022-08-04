import React, {useEffect} from 'react';

import {ChainInfo, WalletStatus} from '../../../enums';
import {useEnvs} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL1} from '../../../providers/TransferProvider';
import {useL1Wallet} from '../../../providers/WalletsProvider';
import {WalletButton} from '../index';

export const EthereumWalletButton = () => {
  const {account, config, error, status} = useL1Wallet();
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
    // TODO - will display the login modal
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
      logoPath={config?.logoPath || ''}
      network={networkName}
      status={status}
      onClick={handleWalletButtonClick}
    />
  );
};
