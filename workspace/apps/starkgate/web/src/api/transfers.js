import {TRANSFER_LOG_SERVICE_URL as baseURL} from '@config/envs';
import {createHttpClient, parseHttpClientError} from '@starkware-webapps/http-client';
import {promiseHandler} from '@starkware-webapps/utils';

export const GET_TRANSFERS_ENDPOINT = 'get_transfers';
export const GET_PENDING_WITHDRAWALS_ENDPOINT = 'get_pending_withdrawals';

const httpClient = createHttpClient({
  baseURL
});

export const fetchPendingWithdrawals = async l1address => {
  const [result, error] = await promiseHandler(
    httpClient.get(`/${GET_PENDING_WITHDRAWALS_ENDPOINT}?l1address=${l1address}`)
  );
  if (error) {
    throw parseHttpClientError(error);
  }
  return result.data;
};

export const fetchL1Transfers = async (l1address, next) => {
  const [result, error] = await promiseHandler(
    httpClient.get(
      `/${GET_TRANSFERS_ENDPOINT}?l1address=${l1address}${next ? `&next=${next}` : ''}`
    )
  );
  if (error) {
    throw parseHttpClientError(error);
  }
  return result.data;
};

export const fetchL2Transfers = async (l2address, next) => {
  const [result, error] = await promiseHandler(
    httpClient.get(
      `/${GET_TRANSFERS_ENDPOINT}?l2address=${l2address}${next ? `&next=${next}` : ''}`
    )
  );
  if (error) {
    throw parseHttpClientError(error);
  }
  return result.data;
};
