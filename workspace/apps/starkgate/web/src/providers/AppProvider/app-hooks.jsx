import {useContext} from 'react';

import {AppContext} from './app-context';

export const useApp = () => useContext(AppContext);

export const useBlockExplorer = () => {
  const {blockExplorer, selectBlockExplorer} = useApp();

  return {blockExplorer, selectBlockExplorer};
};
