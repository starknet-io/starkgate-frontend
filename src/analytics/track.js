import splitbee from '@splitbee/web';

import utils from '../utils';

const logger = utils.logger.getLogger('Analytics');

export const track = (event, data) => {
  logger.debug('Sending track event...', {event, data});
  splitbee.track(event, data).then(() => {
    logger.debug('Track event sent.');
  });
};

export const setUser = data => {
  logger.debug('Set user', data);
  splitbee.user.set(data).then();
};
