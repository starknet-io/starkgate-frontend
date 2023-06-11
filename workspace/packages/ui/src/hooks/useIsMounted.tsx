import {MutableRefObject, useEffect, useRef} from 'react';

export const useIsMounted = (): MutableRefObject<boolean> => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};
