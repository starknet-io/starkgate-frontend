import {useCallback} from 'react';

export const useTracking = (
  trackFn: (event: string, data: any) => void,
  eventOrEvents: string | string[]
) => {
  let eventsArray = eventOrEvents;
  if (typeof eventsArray === 'string') {
    eventsArray = [eventsArray];
  }

  const trackEvent = useCallback((event: string) => (data?: any) => trackFn(event, data), []);

  return eventsArray.map(trackEvent, [eventsArray]);
};
