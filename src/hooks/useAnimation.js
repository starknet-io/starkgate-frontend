import {useState} from 'react';

export const useAnimation = interval => {
  const [isAnimate, setIsAnimate] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const startAnimation = () => {
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
    }
    setIsAnimate(true);
    setTimeoutId(setTimeout(() => setIsAnimate(false), interval));
  };
  return [isAnimate, startAnimation];
};
