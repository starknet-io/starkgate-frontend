import {NetworkType, WalletIdL2} from '@starkware-industries/commons-js-enums';
import {useLogger} from '@starkware-industries/commons-js-hooks';
import {useCallback} from 'react';

import walletsConfig from '../config/wallets';
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
