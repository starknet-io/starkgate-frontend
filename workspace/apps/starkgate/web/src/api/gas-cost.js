import {RELAYER_GAS_COST_URL} from '@config/envs';
import {createHttpClient, parseHttpClientError} from '@starkware-webapps/http-client';
import {promiseHandler} from '@starkware-webapps/utils';

const httpClient = createHttpClient({baseURL: RELAYER_GAS_COST_URL});

export const fetchGasCost = async bridgeAddress => {
  const [response, error] = await promiseHandler(
    httpClient.get(`${bridgeAddress}/${Math.floor(new Date().getTime() / 1000)}`)
  );
  if (error) {
    throw parseHttpClientError(error);
  } else {
    const {
      result: {gasCost}
    } = response.data;
    return gasCost;
  }
};
