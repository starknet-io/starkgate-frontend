import {GOOGLE_MEASURE_ID} from '@config/envs';

export const track = (event, data) => {
  window.gtag('event', `${APP_NAME}/${event}`, data);
};

export const setUser = data => {
  window.gtag('config', GOOGLE_MEASURE_ID, {
    user_id: `${data.accountL1}-${data.accountL2}`,
    user_account_L1: data.accountL1,
    user_account_L2: data.accountL2
  });
};
