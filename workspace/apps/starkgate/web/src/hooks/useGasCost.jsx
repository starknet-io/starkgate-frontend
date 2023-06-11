import {useCallback} from 'react';

import {fetchGasCost} from '@api';
import {useSelectedToken} from '@providers';
import {promiseHandler} from '@starkware-webapps/utils';

import {useTransferTranslation} from './useTranslation';

export const useGasCost = () => {
  const selectedToken = useSelectedToken();
  const {autoWithdrawalUnavailable} = useTransferTranslation();
  return useCallback(async () => {
    const {bridgeAddress} = selectedToken;
    const [gasCost, error] = await promiseHandler(fetchGasCost(bridgeAddress));
    if (error) {
      error.message = autoWithdrawalUnavailable;
      throw error;
    }
    return gasCost;
  }, [selectedToken]);
};
