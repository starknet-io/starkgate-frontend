import {createContext} from 'react';

import {initialState} from './source-reducer';

export const SourceContext = createContext({
  ...initialState,
  selectGroup: source => ({source}),
  selectSource: source => ({source})
});
