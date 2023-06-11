import {useEffect, useState} from 'react';

import {promiseHandler} from '@starkware-webapps/utils';

type FetchData = {
  isLoading: boolean;
  data: any;
  error: any;
};

export const useFetchData = (fn: () => Promise<any> | null, deps = []): FetchData => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetch() {
      if (fn) {
        setIsLoading(true);
        const [promiseData, promiseError] = await promiseHandler(fn() as Promise<any>);
        if (!mounted) return;
        if (promiseError) {
          setError(promiseError);
          setIsLoading(false);
        }
        setData(promiseData);
        setIsLoading(false);
      } else {
        setData(null);
        setIsLoading(false);
      }
    }

    fetch();

    return () => {
      mounted = false;
    };
  }, deps);

  return {
    isLoading,
    data,
    error
  };
};
