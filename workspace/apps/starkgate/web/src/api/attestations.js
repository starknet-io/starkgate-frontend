import {ATTESTATIONS_ORACLE_URL} from '@config/envs';
import {createHttpClient} from '@starkware-webapps/http-client';
import {getLogger} from '@starkware-webapps/js-logger';
import {promiseHandler} from '@starkware-webapps/utils';

const logger = getLogger('attestations');
const httpClient = createHttpClient({baseURL: ATTESTATIONS_ORACLE_URL});
const query = '?type=teleport_starknet&index=';

export const fetchAttestations = async (l2TxHash, threshold) => {
  const [response, error] = await promiseHandler(httpClient.get(query + l2TxHash));
  if (error) {
    logger.log('Oracle error', error, {l2TxHash});
  } else {
    const attestations = response.data || [];
    logger.log('Oracle attestations', attestations, {l2TxHash});
    if (attestations.length < threshold) {
      logger.log('Oracle attestations are below the threshold', threshold, {l2TxHash});
    } else {
      return attestations;
    }
  }
};
