import {useEffect, useState} from 'react';

import {promiseHandler} from '../utils';

export const useFetchData = (func, deps = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      setError(null);
      const [data, error] = await promiseHandler(func());
      if (!mounted) return;
      if (error) {
        setError(error);
        setIsLoading(false);
      }
      setData(data);
      setIsLoading(false);
    }
    let mounted = true;
    fetch();
    return () => (mounted = false);
  }, deps);

  return {
    isLoading,
    data,
    error
  };
};
