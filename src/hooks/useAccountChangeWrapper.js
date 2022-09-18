import {useAccountChange} from '@starkware-industries/commons-js-hooks';

import {useAccountHash} from '../providers/WalletsProvider';

export const useAccountChangeWrapper = (fn, deps = []) => {
  const accountHash = useAccountHash();
  useAccountChange(accountHash)(fn, deps);
};
