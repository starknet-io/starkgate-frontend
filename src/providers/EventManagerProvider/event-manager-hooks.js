import {useCallback, useContext} from 'react';

import {EventManagerContext} from './event-manager-context';

export const useDepositEvent = () => {
  const {addDepositListener} = useContext(EventManagerContext);

  return useCallback((filter, callback) => addDepositListener(filter, callback), []);
};

export const useWithdrawalEvent = () => {
  const {addWithdrawalListener} = useContext(EventManagerContext);

  return useCallback((filter, callback) => addWithdrawalListener(filter, callback), []);
};
