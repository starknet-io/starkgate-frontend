import {useCallback, useContext} from 'react';

import {EventName} from '../../enums';
import {useStarknetContract} from '../../hooks';
import {EventManagerContext} from './event-manager-context';

export const useEventListener = () => {
  return useContext(EventManagerContext);
};

export const useDepositListener = () => {
  const {addListener} = useContext(EventManagerContext);

  return useCallback(callback => addListener(EventName.L1.LOG_DEPOSIT, callback), [addListener]);
};

export const useWithdrawalListener = () => {
  const {addListener} = useContext(EventManagerContext);

  return useCallback(callback => addListener(EventName.L1.LOG_WITHDRAWAL, callback), [addListener]);
};

export const useMessageToL2PastEvents = () => {
  const {getPastEvents} = useContext(EventManagerContext);
  const starknetContract = useStarknetContract();

  return useCallback(async depositEvent => {
    const {blockNumber, transactionHash} = depositEvent;
    const pastEvents = await getPastEvents(starknetContract, EventName.L1.LOG_MESSAGE_TO_L2, {
      fromBlock: blockNumber
    });
    debugger;
    return pastEvents.find(e => e.transactionHash === transactionHash);
  }, []);
};
