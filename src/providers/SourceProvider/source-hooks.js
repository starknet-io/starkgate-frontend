import {useContext} from 'react';

import {SourceContext} from './source-context';

export const useSource = () => {
  const {source, selectSource, selectDefaultSource} = useContext(SourceContext);

  return {
    source,
    selectSource,
    selectDefaultSource
  };
};
