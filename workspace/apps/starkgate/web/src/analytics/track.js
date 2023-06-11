import {getLogger} from '@starkware-webapps/js-logger';

import {track as gtagTrack, setUser as setGtagUser} from './gtag';
import {setUser as setSplitbeeUser, track as splitbeeTrack} from './splitbee';

const logger = getLogger('Analytics');

export const track = (event, data) => {
  logger.debug('Sending track event...', {event, data});
  gtagTrack(event, data);
  splitbeeTrack(event, data);
  logger.debug('Track event sent.');
};

export const setUser = data => {
  logger.debug('Set user', data);
  setGtagUser(data);
  setSplitbeeUser(data);
};
