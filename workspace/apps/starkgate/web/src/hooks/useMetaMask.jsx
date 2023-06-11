import {useCallback, useEffect, useState} from 'react';

import {walletsConfig} from '@config/wallets';
import {useLoginTranslation, useWalletHandler} from '@hooks';
import MetaMaskOnboarding from '@metamask/onboarding';
import {NetworkType, WalletIdL1} from '@starkware-webapps/enums';
import {useLogger} from '@starkware-webapps/ui';
import {evaluate} from '@starkware-webapps/utils';

const onboarding = new MetaMaskOnboarding();

export const useMetaMask = () => {
  const logger = useLogger('useMetaMask');
  const [config, setConfig] = useState(walletsConfig.L1.find(({id}) => id === WalletIdL1.METAMASK));
  const walletHandler = useWalletHandler(config, NetworkType.L1);
  const {installTxt} = useLoginTranslation();

  const isInstalled = useCallback(() => MetaMaskOnboarding.isMetaMaskInstalled(), []);

  useEffect(() => {
    if (!isInstalled()) {
      const newConfig = {...config, name: evaluate(installTxt, {wallet: config.name})};
      logger.log('set config', newConfig);
      setConfig(newConfig);
    }
  }, []);

  const connect = useCallback(async () => {
    logger.log('connect');
    if (!isInstalled()) {
      logger.log('start onboarding');
      return onboarding.startOnboarding();
    }
    return await walletHandler.connect(config);
  }, [walletHandler]);

  return {
    ...walletHandler,
    ...config,
    connect
  };
};
