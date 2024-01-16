import {useCallback, useMemo} from 'react';

import {getWalletIconUrl, useWalletBookContext} from '@dynamic-labs/wallet-book';
import {useConnectWalletTracking, useEnvs} from '@hooks';
import {useApp, useIsL1, useIsL2, useMenu, useWalletLogin, useWallets} from '@providers';
import {ChainInfo, NetworkType} from '@starkware-webapps/enums';
import {WalletButton} from '@ui';

export const WalletButtons = () => {
  const {walletBook} = useWalletBookContext();
  const {starknetAccount, starknetWalletName, ethereumAccount, ethereumWalletName} = useWallets();
  const {login, isEthereumWalletConnected, isStarknetWalletConnected} = useWalletLogin();
  const {SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID} = useEnvs();
  const {navigateToRoute} = useApp();
  const {showAccountMenu} = useMenu();
  const [, swapToL2] = useIsL2();
  const [, swapToL1] = useIsL1();
  const [, trackConnectEthereumWalletClick, trackConnectStarknetWalletClick] =
    useConnectWalletTracking();

  const getLogoPath = useCallback(
    walletName => {
      if (walletName) {
        return getWalletIconUrl(walletBook, walletName.toLowerCase());
      }
    },
    [walletBook]
  );

  const starknetLogoPath = useMemo(() => getLogoPath(starknetWalletName), [starknetWalletName]);

  const ethereumLogoPath = useMemo(() => getLogoPath(ethereumWalletName), [ethereumWalletName]);

  const handleStarknetWalletClick = useCallback(() => {
    handleWalletButtonClick({
      login: () => login(),
      isConnected: isStarknetWalletConnected,
      trackClick: trackConnectStarknetWalletClick,
      swapFn: swapToL2
    });
  }, [isStarknetWalletConnected, trackConnectStarknetWalletClick, swapToL2]);

  const handleEthereumWalletClick = useCallback(() => {
    handleWalletButtonClick({
      login: () => login(),
      isConnected: isEthereumWalletConnected,
      trackClick: trackConnectEthereumWalletClick,
      swapFn: swapToL1
    });
  }, [isEthereumWalletConnected, trackConnectEthereumWalletClick, swapToL1]);

  const handleWalletButtonClick = useCallback(
    ({login, isConnected, trackClick, swapFn}) => {
      if (isConnected) {
        trackClick();
        swapFn();
        showAccountMenu();
        navigateToRoute('/');
      } else {
        login();
      }
    },
    [showAccountMenu, navigateToRoute]
  );

  return (
    <>
      <WalletButton
        account={ethereumAccount}
        chain={ChainInfo.L1[SUPPORTED_L1_CHAIN_ID].NAME}
        isConnected={isEthereumWalletConnected}
        logoPath={ethereumLogoPath}
        network={NetworkType.L1}
        onClick={handleEthereumWalletClick}
      />
      <WalletButton
        account={starknetAccount}
        chain={ChainInfo.L2[SUPPORTED_L2_CHAIN_ID].NAME}
        isConnected={isStarknetWalletConnected}
        logoPath={starknetLogoPath}
        network={NetworkType.L2}
        onClick={handleStarknetWalletClick}
      />
    </>
  );
};
