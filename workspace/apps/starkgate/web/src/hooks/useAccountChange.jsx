import {useEffect} from 'react';

import {useWeb3} from '@hooks';
import {useAccountHash} from '@providers';

export const useAccountChange = (fn, deps = []) => {
  const accountHash = useAccountHash();
  const web3 = useWeb3();

  useEffect(() => {
    // either disconnecting the wallet or connecting and web3 is ready do use
    if (!accountHash || web3) {
      const unmountFn = fn(accountHash);
      return () => {
        unmountFn && unmountFn();
      };
    }
  }, [accountHash, web3, ...deps]);
};
