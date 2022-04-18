import {useCallback} from 'react';

import {track, TrackEvent} from '../analytics';

export const useTracking = events => {
  if (typeof events === 'string') {
    events = [events];
  }

  const trackEvent = useCallback(event => data => track(event, data), []);

  return events.map(trackEvent, [events]);
};

export const useMenuTracking = () => {
  return useTracking([
    TrackEvent.ACCOUNT_MENU,
    TrackEvent.TRANSFER_MENU,
    TrackEvent.SELECT_TOKEN_MENU
  ]);
};

export const useLoginTracking = () => {
  return useTracking([TrackEvent.LOGIN_SCREEN, ...Object.values(TrackEvent.LOGIN)]);
};

export const useTermsTracking = () => {
  return useTracking([TrackEvent.TERMS_SCREEN, ...Object.values(TrackEvent.TERMS)]);
};

export const useTransferTracking = () => {
  return useTracking([TrackEvent.TRANSFER.MAX_CLICK, TrackEvent.TRANSFER.SWAP_NETWORK]);
};

export const useTransferToL1Tracking = () => {
  return useTracking([...Object.values(TrackEvent.TRANSFER.TRANSFER_TO_L1)]);
};

export const useTransferToL2Tracking = () => {
  return useTracking([...Object.values(TrackEvent.TRANSFER.TRANSFER_TO_L2)]);
};

export const useCompleteTransferToL1Tracking = () => {
  return useTracking([...Object.values(TrackEvent.TRANSFER.COMPLETE_TRANSFER_TO_L1)]);
};

export const useAccountTracking = () => {
  return useTracking([...Object.values(TrackEvent.ACCOUNT)]);
};

export const useSelectTokenTracking = () => {
  return useTracking([...Object.values(TrackEvent.SELECT_TOKEN)]);
};
