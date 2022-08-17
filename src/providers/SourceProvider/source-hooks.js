import {useContext} from 'react';

import {SourceContext} from './source-context';

export const useSource = () => {
  const {group, source, selectGroup, selectSource} = useContext(SourceContext);

  return {
    group,
    source,
    selectGroup,
    selectSource
  };
};
