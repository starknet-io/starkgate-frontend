import {createContext} from 'react';

import {initialState} from './source-reducer';

export const SourceContext = createContext({
  ...initialState,
  selectSource: source => ({source}),
  selectDefaultSource: () => ({})
});
