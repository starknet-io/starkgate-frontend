import {NetworkType, WalletStatus} from '@starkware-industries/commons-js-enums';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

import {useConnectWalletTracking} from '../../../hooks';
import {useApp} from '../../../providers/AppProvider';
import {useMenu} from '../../../providers/MenuProvider';
import {useLoginModal} from '../../../providers/ModalProvider';
import {WalletButton} from '../index';

export const NetworkWalletButton = ({account, chain, logoPath, network, status, error, swapFn}) => {
  const {navigateToRoute} = useApp();
  const {showAccountMenu} = useMenu();
  const showLoginModal = useLoginModal();
  const [, trackConnectEthereumWalletClick, trackConnectStaknetWalletClick] =
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
    network === NetworkType.L1
      ? trackConnectEthereumWalletClick()
      : trackConnectStaknetWalletClick();
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
