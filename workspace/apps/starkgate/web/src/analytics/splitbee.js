import splitbee from '@splitbee/web';

export const track = (event, data) => {
  splitbee.track(event, data);
};

export const setUser = data => {
  splitbee.user.set(data);
};
