import PropTypes from 'prop-types';
import {useEffect} from 'react';

import {useConnectWalletTracking} from '@hooks';
import {useApp, useLoginModal, useMenu} from '@providers';
import {WalletStatus, isL1Network} from '@starkware-webapps/enums';
import {WalletButton} from '@ui';

export const NetworkWalletButton = ({account, chain, logoPath, network, status, error, swapFn}) => {
  const {navigateToRoute} = useApp();
  const {showAccountMenu} = useMenu();
  const showLoginModal = useLoginModal();
  const [, trackConnectEthereumWalletClick, trackConnectStarknetWalletClick] =
    useConnectWalletTracking();

  useEffect(() => {
    error && handleWalletError(error);
  }, [error]);

  const handleWalletButtonClick = () => {
    switch (status) {
      case WalletStatus.ERROR:
      case WalletStatus.CONNECTING:
      case WalletStatus.DISCONNECTED:
        return handleConnectWallet();
      case WalletStatus.CONNECTED:
        return handleConnectedWallet();
      default:
        break;
    }
  };

  const handleConnectedWallet = () => {
    swapFn();
    showAccountMenu();
    navigateToRoute('/');
  };

  const handleConnectWallet = () => {
    isL1Network(network) ? trackConnectEthereumWalletClick() : trackConnectStarknetWalletClick();
    showLoginModal(network);
  };

  const handleWalletError = () => {
    // TODO
  };

  return (
    <WalletButton
      account={account}
      chain={chain}
      logoPath={logoPath}
      network={network}
      status={status}
      onClick={handleWalletButtonClick}
    />
  );
};

NetworkWalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  logoPath: PropTypes.string,
  network: PropTypes.string,
  status: PropTypes.string,
  error: PropTypes.object,
  swapFn: PropTypes.func
};
