import {
  promiseHandler,
  createHttpClient,
  parseHttpClientError
} from '@starkware-industries/commons-js-utils';

import {API_ENDPOINT_URL} from '../config/envs';

const SCREENING_ENDPOINT = '/api/screening/risk';
const httpClient = createHttpClient({baseURL: API_ENDPOINT_URL + SCREENING_ENDPOINT});

export const screenAddress = async address => {
  const [result, error] = await promiseHandler(httpClient.get(`/${address}`));
  if (error) {
    throw parseHttpClientError(error);
  }
  const {
    data: {blocked}
  } = result;
  return blocked;
};
