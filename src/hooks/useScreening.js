import {useFetchData} from '@starkware-industries/commons-js-hooks';

import {screenAddress} from '../api';

export const useScreening = address => {
  const {
    isLoading: isScreening,
    data: blocked,
    error
  } = useFetchData(address ? () => screenAddress(address) : null, [address]);

  return {isScreening, blocked, error};
};
