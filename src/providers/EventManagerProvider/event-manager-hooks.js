import {useCallback, useContext} from 'react';

import {EventName} from '../../enums';
import {EventManagerContext} from './event-manager-context';

export const useEventListener = () => {
  return useContext(EventManagerContext);
};

export const useLogMessageToL2Listener = () => {
  const {addListener} = useContext(EventManagerContext);

  return useCallback(
    callback => addListener(EventName.L1.LOG_MESSAGE_TO_L2, callback),
    [addListener]
  );
};

export const useLogDepositListener = () => {
  const {addListener} = useContext(EventManagerContext);

  return useCallback(callback => addListener(EventName.L1.LOG_DEPOSIT, callback), [addListener]);
};

export const useLogWithdrawalListener = () => {
  const {addListener} = useContext(EventManagerContext);

  return useCallback(callback => addListener(EventName.L1.LOG_WITHDRAWAL, callback), [addListener]);
};
