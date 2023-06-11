import {useState} from 'react';

type Timeout = ReturnType<typeof setTimeout> | null;

type IsAnimate = boolean;
type StartAnimation = () => void;

export const useAnimation = (interval: number): [IsAnimate, StartAnimation] => {
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<Timeout>(null);

  const startAnimation = (): void => {
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
    }
    setIsAnimate(true);
    setTimeoutId(setTimeout((): void => setIsAnimate(false), interval));
  };

  return [isAnimate, startAnimation];
};
