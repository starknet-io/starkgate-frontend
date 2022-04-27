import {useCallback, useContext} from 'react';

import {EventName} from '../../enums';
import {useStarknetContract} from '../../hooks';
import {EventManagerContext} from './event-manager-context';

export const useEventListener = eventName => {
  const {addListener, removeListeners} = useContext(EventManagerContext);

  const _addListener = useCallback(callback => addListener(eventName, callback), [addListener]);

  const _removeListeners = useCallback(() => removeListeners(eventName), [removeListeners]);

  return {
    addListener: _addListener,
    removeListener: _removeListeners
  };
};

export const useDepositListener = () => {
  return useEventListener(EventName.L1.LOG_DEPOSIT);
};

export const useWithdrawalListener = () => {
  return useEventListener(EventName.L1.LOG_WITHDRAWAL);
};

export const useDepositMessageToL2Event = () => {
  const {getPastEvents} = useContext(EventManagerContext);
  const starknetContract = useStarknetContract();

  return useCallback(
    async depositEvent => {
      const {blockNumber, transactionHash} = depositEvent;
      const pastEvents = await getPastEvents(starknetContract, EventName.L1.LOG_MESSAGE_TO_L2, {
        fromBlock: blockNumber - 1,
        toBlock: 'latest'
      });
      return pastEvents.find(e => e.transactionHash === transactionHash);
    },
    [starknetContract]
  );
};
