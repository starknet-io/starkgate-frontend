import {useCallback} from 'react';

import {walletsConfig} from '@config/wallets';
import {NetworkType, WalletIdL2} from '@starkware-webapps/enums';
import {useLogger} from '@starkware-webapps/ui';

import {useWalletHandler} from './useWalletHandlers';

const config = walletsConfig.L2.find(w => w.id === WalletIdL2.GSW);

export const useGetStarknet = () => {
  const walletHandler = useWalletHandler(config, NetworkType.L2);
  const logger = useLogger('useGetStarknet');

  const connect = useCallback(
    async params => {
      logger.log('connect', params);
      return await walletHandler.connect(params);
    },
    [walletHandler]
  );

  return {
    ...walletHandler,
    ...config,
    connect
  };
};
