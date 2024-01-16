import {useMemo} from 'react';

import {useConnectWalletTracking, useTransferTranslation} from '@hooks';
import {useWalletLogin} from '@providers';
import {NetworkType} from '@starkware-webapps/enums';
import {evaluate} from '@starkware-webapps/utils';
import {MainMenuButton} from '@ui';

export const LoginWalletButton = props => {
  const {loginWalletsButtonTxt, loginWalletButtonTxt} = useTransferTranslation();
  const [trackConnectWalletClick] = useConnectWalletTracking();
  const {login, isDisconnected, isEthereumWalletConnected} = useWalletLogin();

  const text = useMemo(() => {
    return isDisconnected
      ? loginWalletsButtonTxt
      : evaluate(loginWalletButtonTxt, {
          networkName: isEthereumWalletConnected ? NetworkType.L2 : NetworkType.L1
        });
  }, [isDisconnected, isEthereumWalletConnected]);

  const handleConnectWallets = () => {
    trackConnectWalletClick();
    login();
  };

  return <MainMenuButton text={text} onClick={handleConnectWallets} {...props} />;
};
