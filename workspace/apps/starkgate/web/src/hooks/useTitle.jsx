import {useEffect} from 'react';

function useTitle(title) {
  useEffect(() => {
    if (document.title !== title) {
      document.title = title;
    }
  }, []);
}

export {useTitle};
