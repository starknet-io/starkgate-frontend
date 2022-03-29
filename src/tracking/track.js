import splitbee from '@splitbee/web';

import utils from '../utils';

const logger = utils.logger.getLogger('Tracking');

export const track = (event, data) => {
  logger.debug('Tracking event', {event, data});
  return splitbee.track(event, data);
};

export const setUser = data => {
  logger.debug('Set user', data);
  return splitbee.user.set(data);
};
