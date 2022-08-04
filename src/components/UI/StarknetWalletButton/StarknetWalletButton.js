import React, {useEffect} from 'react';

import {ChainInfo, WalletStatus} from '../../../enums';
import {useEnvs} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useIsL2} from '../../../providers/TransferProvider';
import {useL2Wallet} from '../../../providers/WalletsProvider';
import {WalletButton} from '../index';

export const StarknetWalletButton = () => {
  const {account, config, error, status} = useL2Wallet();
  const {SUPPORTED_L2_CHAIN_ID} = useEnvs();
  const networkName = 'Starknet';
  const {navigateToRoute} = useApp();
  const {showAccountMenu} = useMenu();
  const [, swapToL2] = useIsL2();

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
        return onL2WalletButtonClick();
      default:
        break;
    }
  };

  const onL2WalletButtonClick = () => {
    swapToL2();
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
      chain={ChainInfo.L2[SUPPORTED_L2_CHAIN_ID].NAME}
      logoPath={config?.logoPath || ''}
      network={networkName}
      status={status}
      onClick={handleWalletButtonClick}
    />
  );
};
