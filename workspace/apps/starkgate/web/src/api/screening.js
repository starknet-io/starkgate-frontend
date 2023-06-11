import {SCREENING_SERVICE_URL as baseURL} from '@config/envs';
import {createHttpClient, parseHttpClientError} from '@starkware-webapps/http-client';
import {promiseHandler} from '@starkware-webapps/utils';

const httpClient = createHttpClient({
  baseURL
});

export const SCREENING_ENDPOINT = 'screen';

export const screenAddress = async address => {
  const [result, error] = await promiseHandler(
    httpClient.get(`/${SCREENING_ENDPOINT}?address=${address}`)
  );
  if (error) {
    throw parseHttpClientError(error);
  }
  const {
    data: {blocked}
  } = result;
  return blocked;
};
