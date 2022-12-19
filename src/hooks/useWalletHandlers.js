import {
  ChainInfo,
  LoginErrorType,
  NetworkType,
  WalletErrorType
} from '@starkware-industries/commons-js-enums';
import {useLogger} from '@starkware-industries/commons-js-hooks';
import {evaluate, promiseHandler} from '@starkware-industries/commons-js-utils';
import {useCallback, useEffect, useState} from 'react';

import {SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID} from '../config/envs';
import {useWallets} from '../providers/WalletsProvider';
import {useGetStarknet} from './useGetStarknet';
import {useMetaMask} from './useMetaMask';
import {useLoginTranslation} from './useTranslation';

export const useWalletHandler = (config, network) => {
  const logger = useLogger(`useWalletHandler(${config.id})`);
  const {unsupportedChainIdTxt} = useLoginTranslation();
  const {config: walletConfig, connectWallet, error: walletError} = useWallets(network);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (walletConfig?.id === config?.id) {
      if (walletError) {
        const error = handleWalletError(walletError);
        logger.log('set error', error);
        setError(error);
      } else {
        logger.log('clear error');
        setError(null);
      }
    }
  }, [walletError]);

  const handleWalletError = error => {
    if (walletError.name === WalletErrorType.CHAIN_UNSUPPORTED_ERROR) {
      const chainName =
        network === NetworkType.L1
          ? ChainInfo.L1[SUPPORTED_L1_CHAIN_ID].NAME
          : ChainInfo.L2[SUPPORTED_L2_CHAIN_ID].NAME;
      return {
        type: LoginErrorType.UNSUPPORTED_CHAIN_ID,
        message: evaluate(unsupportedChainIdTxt, {
          chainName
        })
      };
    }
    return error;
  };

  const connect = useCallback(
    async args => {
      logger.log('connect', args);
      setIsLoading(true);
      const [, error] = await promiseHandler(connectWallet(args));
      if (error) {
        logger.error(error.message);
      }
      setIsLoading(false);
    },
    [config, connectWallet]
  );

  return {
    connect,
    isLoading,
    error
  };
};

export const useWalletHandlersL1 = () => {
  const metamaskApi = useMetaMask();

  return [metamaskApi];
};

export const useWalletHandlersL2 = () => {
  const getStarknetApi = useGetStarknet();

  return [getStarknetApi];
};

export const useWalletHandlers = network => {
  const walletHandlersL1 = useWalletHandlersL1();
  const walletHandlersL2 = useWalletHandlersL2();

  return network === NetworkType.L1 ? walletHandlersL1 : walletHandlersL2;
};
