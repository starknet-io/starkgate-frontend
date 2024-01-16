import {useEffect} from 'react';

import {useWallet} from '@providers';

export const useAccountChange = (fn, deps = []) => {
  const {accountHash} = useWallet();

  useEffect(() => {
    const unmountFn = fn(accountHash);
    return () => {
      unmountFn && unmountFn();
    };
  }, [accountHash, ...deps]);
};
