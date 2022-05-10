import splitbee from '@splitbee/web';

import {getLogger} from '../utils';

const logger = getLogger('Analytics');

export const track = async (event, data) => {
  logger.debug('Sending track event...', {event, data});
  await splitbee.track(event, data);
  logger.debug('Track event sent.');
};

export const setUser = async data => {
  logger.debug('Set user', data);
  await splitbee.user.set(data);
};
