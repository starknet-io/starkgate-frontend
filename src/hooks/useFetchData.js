import {useEffect, useState} from 'react';

export const useFetchData = (func, dep) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await func();
        if (!mounted) return;
        setData(data);
        setIsLoading(false);
      } catch (ex) {
        if (!mounted) return;
        setError(ex);
        setIsLoading(false);
      }
    }
    let mounted = true;
    fetch();
    return () => (mounted = false);
  }, [func, dep]);

  return {
    isLoading,
    data,
    error
  };
};
