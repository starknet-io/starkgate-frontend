import {useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';

export const useIsLoading = deps => {
  const [isLoading, setIsLoading] = useState(true);
  const {isConnected, status} = useWallet();
  useEffect(() => {
    if (!isConnected()) {
      setIsLoading(false);
    } else if (deps != null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [deps, status, isConnected]);
  return isLoading;
};
