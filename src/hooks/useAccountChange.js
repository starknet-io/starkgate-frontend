import {useEffect} from 'react';

import {useAccountHash} from '../providers/WalletsProvider';

export const useAccountChange = fn => {
  const accountHash = useAccountHash();

  useEffect(() => {
    if (accountHash) {
      fn();
    }
  }, [accountHash]);
};
