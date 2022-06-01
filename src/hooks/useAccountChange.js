import {useEffect} from 'react';

import {useAccountHash} from '../providers/WalletsProvider';

export const useAccountChange = (fn, deps = []) => {
  const accountHash = useAccountHash();

  useEffect(() => {
    if (accountHash) {
      const unmountFn = fn();
      return () => {
        unmountFn && unmountFn();
      };
    }
  }, [accountHash, ...deps]);
};
