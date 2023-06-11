import {useEffect, useRef} from 'react';

export const usePrevious = (value: any): any => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
