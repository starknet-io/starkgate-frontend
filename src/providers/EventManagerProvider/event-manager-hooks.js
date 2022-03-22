import {useCallback, useContext} from 'react';

import {EventManagerContext} from './event-manager-context';

export const useEventListener = () => {
  return useContext(EventManagerContext);
};

export const useLogMessageToL2Listener = () => {
  const {addListener} = useContext(EventManagerContext);

  return useCallback(callback => addListener('LogMessageToL2', callback), []);
};

export const useLogDepositListener = () => {
  const {addListener} = useContext(EventManagerContext);

  return useCallback(callback => addListener('LogDeposit', callback), []);
};
