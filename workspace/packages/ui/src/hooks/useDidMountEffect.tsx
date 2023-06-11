import {useEffect, useRef} from 'react';

export const useDidMountEffect = (func: () => unknown, deps = []) => {
  const didMount = useRef<boolean>(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};
